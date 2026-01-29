/**
 * Waits for an element that proves the user is logged in.
 * If the element isn't visible after 10s, it reloads the page and tries again.
 */
export default async () => {
    const loggedInIndicator = '.floating-sidebar-container';
    const timeoutPerAttempt = 10000; // 10 seconds per attempt
    const totalTimeout = 20000;

    // console.log('[Login Check] Waiting for login indicator...');

    let isLoggedIn = false;

    try {
        isLoggedIn = await browser.waitUntil(
            async () => {
                const el = await $(loggedInIndicator);
                return await el.isDisplayed();
            },
            {
                timeout: timeoutPerAttempt,
                interval: 300,
                timeoutMsg: '[Homepage Check] Sidebar not found after initial wait.',
            }
        );
    } catch (err) {
        console.warn('[Homepage Check] Initial wait failed. Reloading page and retrying...');
        await browser.refresh();
    }

    // Retry after reload if necessary
    if (!isLoggedIn) {
        try {
            isLoggedIn = await browser.waitUntil(
                async () => {
                    const el = await $(loggedInIndicator);
                    return await el.isDisplayed();
                },
                {
                    timeout: timeoutPerAttempt,
                    interval: 300,
                    timeoutMsg: '[Homepage Check] Sidebar still not visible after page reload.',
                }
            );
        } catch (err) {
            const screenshotName = `SideBar-NotVisible.png`;
            await browser.saveScreenshot(`./ScreenShots/${screenshotName}`);
            console.error(`[Sidebar Check] ❌ Sidebar not rendered. Screenshot saved as ${screenshotName}`);
            throw new Error('[Sidebar Check] Homepage did not load properly after reload.');
        }
    }

    // console.log('[Homepage Check] ✅ Sidebar is visible — user is logged in.');
};
