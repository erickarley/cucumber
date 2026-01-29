// waitForAppReady.js
import pause from '../action/pause';
import { mediumPause, smallPause } from '../constants/index';

/**
 * Unified app readiness wait for AngularJS + Kendo app.
 *
 * Responsibilities:
 *  - Ensure sidebar (main shell) is visible
 *  - Ensure no global loaders are visible
 *  - Ensure "We’re loading your content" banners are gone
 *  - Provide a single, stable "page is ready" signal
 *
 * Optional options:
 *  - context: string used in logs
 *  - timeoutMs: override global timeout (otherwise uses --timeout= from CLI or default)
 */
export default async function waitForAppReady(options = {}) {
    const {
        context = 'waitForAppReady',
        timeoutMs,
    } = options;

    // CLI timeout: --timeout=45000
    const timeoutArg = process.argv.find(arg => arg.startsWith('--timeout='));
    const cliTimeout = timeoutArg ? parseInt(timeoutArg.split('=')[1], 10) : null;
    const globalTimeout = timeoutMs ?? cliTimeout ?? 120000;

    const overlaySelector = "//div[@flag='controller.isLoading']";
    const kendoLoadingSelector = "//div[contains(@class, 'k-loading-mask')]";
    const progressCircleSelector = "//div[@ng-show='progress.show'][@aria-hidden='false']";
    const gifLoadingSelector = "//img[contains(@src, 'loading-image.gif')]";
    const loadingMessageSelector = "//*[contains(text(), \"We’re loading your content\")]";
    const sidebarSelector = '.floating-sidebar-container';

    const loadingIndicators = [
        { selector: overlaySelector, label: 'main loading overlay' },
        { selector: kendoLoadingSelector, label: 'Kendo loading mask' },
        { selector: progressCircleSelector, label: 'progress spinner' },
        { selector: gifLoadingSelector, label: 'GIF loading image' },
    ];

    const log = (msg) => console.log(`[${context}] ${msg}`);
    const warn = (msg) => console.warn(`[${context}] ${msg}`);
    const errorLog = (msg) => console.error(`[${context}] ${msg}`);

    /**
     * Safe "is element visible" helper:
     *  - Handles stale element references
     *  - Returns false if not existing
     */
    const isSelectorVisible = async (selector) => {
        try {
            const el = await $(selector);
            if (!await el.isExisting()) return false;
            return await el.isDisplayed();
        } catch (err) {
            // Stale, detached, etc. Treat as not visible.
            return false;
        }
    };

    /**
     * Returns true if ANY loader is currently visible.
     */
    const anyLoaderVisible = async () => {
        for (const { selector, label } of loadingIndicators) {
            try {
                const el = await $(selector);
                if (await el.isExisting() && await el.isDisplayed()) {
                    // log(`${label} is visible`);
                    return true;
                }
            } catch (err) {
                // ignore transient DOM issues
                continue;
            }
        }
        return false;
    };

    /**
     * Returns true if any "We’re loading your content" message is visible.
     */
    const loadingMessageVisible = async () => {
        try {
            const messages = await $$(loadingMessageSelector);
            if (messages.length === 0) return false;

            for (const msg of messages) {
                try {
                    if (await msg.isDisplayed()) {
                        return true;
                    }
                } catch {
                    // ignore stale/disappearing element
                }
            }
            return false;
        } catch {
            return false;
        }
    };

    /**
     * Sidebar anchor: ensures the main app shell is present.
     */
    const waitForSidebar = async () => {
        const sidebar = await $(sidebarSelector);
        await browser.waitUntil(
            async () => {
                try {
                    return await sidebar.isDisplayed();
                } catch {
                    return false;
                }
            },
            {
                timeout: Math.min(globalTimeout, 10000),
                interval: 300,
                timeoutMsg: `[${context}] Sidebar not visible within timeout.`,
            }
        );
    };

    // Small initial delay to let Angular settle after big transitions
    await pause(mediumPause);

    // 1) Sidebar must be visible, but if missing, we check if this is a BLANK PAGE error.
    try {
        await waitForSidebar();
    } catch (err) {
        log('Sidebar not visible — checking if page is in a blank state...');

        const loaderVisible = await anyLoaderVisible();
        const messageVisible = await loadingMessageVisible();

        // Document state
        let docReady = true;
        try {
            const readyState = await browser.execute(() => document.readyState);
            docReady = readyState === 'complete' || readyState === 'interactive';
        } catch { }

        // const screenshotName = `BlankOrMissingSidebar-${context}.png`;
        // await browser.saveScreenshot(`./ScreenShots/${screenshotName}`);

        // 🚨 BLANK PAGE DETECTION:
        // No sidebar + no loaders + document fully ready = app broken.
        if (!loaderVisible && !messageVisible && docReady) {
            warn('Blank page detected! Triggering auto-refresh.');

            await browser.refresh();
            await pause(mediumPause); // Give Angular a chance to fully re-bootstrap.

            try {
                await waitForSidebar();
                log('Sidebar restored after refresh.');
            } catch {
                const screenshotName2 = `BlankPageAfterRefresh-${context}.png`;
                await browser.saveScreenshot(`./ScreenShots/${screenshotName2}`);
                errorLog(`Sidebar still missing after refresh. Screenshot saved as ${screenshotName2}`);
                throw new Error('[waitForAppReady] Critical: blank page persisted after refresh.');
            }

        } else {
            // Not a blank page → rethrow original error
            errorLog(`Sidebar missing but page not blank. Screenshot saved as ${screenshotName}`);
            throw err;
        }
    }

    // 2) Wait for loaders + loading messages to clear
    const start = Date.now();

    await browser.waitUntil(
        async () => {
            const loaderVisible = await anyLoaderVisible();
            const messageVisible = await loadingMessageVisible();

            // Optionally also check document.readyState
            let docReady = true;
            try {
                const readyState = await browser.execute(() => document.readyState);
                docReady = readyState === 'complete' || readyState === 'interactive';
            } catch {
                // ignore JS errors here
            }

            // If the page is in "Report loading" mode, accept this as ready.
            // The real wait for content will happen inside waitReportContent().
            if (messageVisible) {
                //log('Report loading screen detected — treating as stable for this phase.');
                return true;
            }

            // Standard rule: page is busy if loaders OR not document.ready.
            const stillBusy = loaderVisible || !docReady;
            return !stillBusy;

        },
        {
            timeout: globalTimeout,
            interval: 400,
            timeoutMsg: `[${context}] App did not reach a stable state before timeout.`,
        }
    );

    const total = Date.now() - start;
    // log(`App reported ready after ${Math.floor(total / 1000)}s`);

    // 3) Tiny stabilization pause at the end to avoid micro-flickers
    await pause(smallPause);
}
