// waitReportContent.js
import waitForAppReady from '../../lib/waitForAppReady';
import pause from '../../action/pause';
import { smallPause } from '../../constants';

export default async () => {
    const reportId = await browser.sharedStore.get('reportId');
    // console.log(`[waitForReportContent] 📄 Current entity ID: ${reportId}`);

    const log = (msg) => console.log(`[waitForReportContent] ${msg}`);
    const warn = (msg) => console.warn(`[waitForReportContent] ${msg}`);

    // -----------------------------
    // 1. Unified Application Readiness
    // -----------------------------
    await waitForAppReady({ context: 'waitForReportContent' });

    // -----------------------------
    // 2. Optional Toast Handling
    // -----------------------------
    const toastBannerSelector = "//md-toast[contains(@class, 'md-top')]";
    const toastCloseButtonSelector = "//md-toast//button[@ng-click='closeToast()']";

    try {
        const toast = await $(toastBannerSelector);
        const toastAppeared = await browser.waitUntil(
            async () => {
                try {
                    return await toast.isDisplayed();
                } catch {
                    return false;
                }
            },
            {
                timeout: 15000,
                interval: 500,
                timeoutMsg: '[waitForReportContent] Toast banner did not appear in time.',
            }
        );

        if (toastAppeared) {
            const closeBtn = await $(toastCloseButtonSelector);

            try {
                if (await closeBtn.isDisplayed() && await closeBtn.isClickable()) {
                    await closeBtn.click();

                    await browser.waitUntil(
                        async () => {
                            try {
                                return !(await toast.isDisplayed());
                            } catch {
                                return true; // toast removed — OK
                            }
                        },
                        {
                            timeout: 5000,
                            interval: 200,
                            timeoutMsg: '[waitForReportContent] Toast did not disappear after clicking close.',
                        }
                    );
                }
            } catch (closeErr) {
                warn(`Unable to close toast cleanly: ${closeErr.message}`);
            }
        }
    } catch (err) {
        if (!err.message.includes('Toast banner did not appear in time')) {
            warn(`Unexpected toast handling error: ${err.message}`);
        }
        // Silent pass — toast is optional
    }

    // Tiny stabilization pause
    await pause(smallPause);

    // -----------------------------
    // 3. GRID-READY WAIT — CRITICAL FIX
    // -----------------------------

    /**
     * A report is only truly ready when either:
     *  - The grid has ≥ 1 data row
     *  - OR a "No results" message is visible
     *  - OR the grid container exists (structure loaded)
     *
     * This eliminates race conditions where spinners disappear
     * before the content grid fully initializes.
     */
async function waitForGridReady(timeout = 60000) {

    const gridContainerSelector =
        "//div[contains(@class,'k-grid') or contains(@class,'grid-container')]";

    const dataRowSelector =
        "//div[contains(@class,'k-grid')]//tr[contains(@class,'k-master-row')]";

    const noResultsSelector =
        "//*[contains(text(),'No results') or contains(text(),'Results: 0')]";

    const headerSelector =
        "//div[contains(@class,'k-grid-header')]";

    const loadingMaskSelector =
        "//div[contains(@class,'k-loading-mask') or contains(@class,'k-loading-image')]";

    return browser.waitUntil(async () => {
        const container = await $$(gridContainerSelector);
        if (container.length === 0) return false; // grid not initialized yet

        // 1. If loading mask is visible → still loading
        const mask = await $$(loadingMaskSelector);
        if (mask.length > 0) {
            try {
                if (await mask[0].isDisplayed()) return false;
            } catch {}
        }

        // 2. Rows present = ready
        const rows = await $$(dataRowSelector);
        if (rows.length > 0) {
            // log("Grid ready: data rows detected.");
            return true;
        }

        // 3. "No results" message = ready
        const noResults = await $$(noResultsSelector);
        if (noResults.length > 0) {
            // log('Grid ready: "No results" message detected.');
            return true;
        }

        // 4. EMPTY GRID SAFETY CHECK:
        // If header exists, grid is fully rendered (even if empty)
        const header = await $$(headerSelector);
        if (header.length > 0) {
            // log("Grid ready: header present but no rows.");
            return true;
        }

        // Otherwise, still initializing
        return false;

    }, {
        timeout,
        interval: 400,
        timeoutMsg: "[waitForReportContent] Grid did not finish rendering.",
    });
}

    // Wait for the Kendo grid / query grid to complete rendering
    await waitForGridReady();

    // log('Report content fully ready.');
};
