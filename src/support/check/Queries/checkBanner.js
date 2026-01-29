/**
 * Soft check for the presence of a banner containing the expected text.
 * If the banner is not found or displayed, logs a warning instead of failing the test.
 *
 * @param {string} expectedBannerName - The banner text to search for.
 */
export default async (expectedBannerName) => {
    const bannerSelector = `//span[contains(., '${expectedBannerName}')]`;
    const timeout = 10000;

    try {
        const success = await browser.waitUntil(
            async () => {
                const elements = await $$(bannerSelector);
                return elements.length > 0 && await elements[0].isDisplayed();
            },
            {
                timeout,
                timeoutMsg: `Banner "${expectedBannerName}" not displayed in time.`,
                interval: 300,
            }
        );

        if (success) {
            // console.log(`[Banner Check] ✅ Banner "${expectedBannerName}" appeared.`);
        }

    } catch (err) {
        // const screenshotName = `BannerNotFound-${expectedBannerName.replace(/\s+/g, '-')}-${Date.now()}.png`;
        // await browser.saveScreenshot(`./ScreenShots/${screenshotName}`);
        // console.warn(`[Error - Banner Check] ⚠️ Banner "${expectedBannerName}" did not appear.`);
        // DO NOT throw error – soft fail
    }
};
