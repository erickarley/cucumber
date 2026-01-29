/**
 * Wait until the item master loading spinner disappears
 */
export default async () => {
    const loaderXPath = "//md-progress-circular[contains(@class, 'loader') and contains(@class, 'md-mode-indeterminate')]";

    try {
        await browser.waitUntil(async () => {
            const elements = await $$(loaderXPath);
            if (elements.length === 0) return true;

            for (const el of elements) {
                if (await el.isDisplayed()) return false;
            }

            return true;
        }, {
            timeout: 15000, // 15 seconds timeout
            interval: 300,
            timeoutMsg: '[waitForItemMasterLoader] Loader still visible after timeout.'
        });

        // console.log('[waitForItemMasterLoader] Loader disappeared successfully.');

    } catch (err) {
        await browser.saveScreenshot('./ScreenShots/ItemMasterLoaderStillVisible.png');
        throw new Error('[waitForItemMasterLoader] Spinner did not disappear in time. Screenshot saved.');
    }
};
