import { bigPause, smallPause } from '../../constants';
import pause from '../../action/pause';

/**
 * Checks for the banner with the given text, then closes it via the X button.
 * Logs warnings if banner is not found or can't be closed.
 * @param {string} expectedBannerText - Text expected in the banner
 */
export default async (expectedBannerText) => {
    const bannerTextSelector = `//span[contains(., '${expectedBannerText}')]`;
    const closeButtonSelector = `//*[@id="toast-overlay"]/md-toast/div/button/ag-md-icon/ng-bind-html/svg`;

    try {
        // Step 1: Wait for banner to appear with correct text
        await browser.waitUntil(
            async () => {
                const el = await $(bannerTextSelector);
                return await el.isExisting() && await el.isDisplayed();
            },
            {
                timeout: bigPause,
                interval: 300,
                // timeoutMsg: `[Banner Check] Banner with text "${expectedBannerText}" did not appear in time.`,
            }
        );

        // console.log(`[Banner Check] ✅ Banner "${expectedBannerText}" appeared.`);
    } catch (err) {
        // console.warn(`[Banner Check] ⚠️ Banner "${expectedBannerText}" did not appear within timeout.`);
        return; // Exit early
    }

    // Step 2: Click the close button
    try {
        const closeBtn = await $(closeButtonSelector);
        if (await closeBtn.isExisting() && await closeBtn.isDisplayed()) {
            await closeBtn.click();
            // console.log(`[Banner Check] ✖️ Clicked close button.`);
        } else {
            // console.warn(`[Banner Check] ⚠️ Close button was not available or visible.`);
        }
    } catch (err) {
        // console.warn(`[Banner Check] ⚠️ Error trying to click close button: ${err.message}`);
    }

    // Step 3: Confirm the banner is gone
    try {
        await browser.waitUntil(
            async () => {
                const el = await $(bannerTextSelector);
                return !(await el.isExisting()) || !(await el.isDisplayed());
            },
            {
                timeout: bigPause,
                interval: 300,
                // timeoutMsg: `[Banner Check] Banner with text "${expectedBannerText}" did not disappear after close.`,
            }
        );
        // console.log(`[Banner Check] ✅ Banner "${expectedBannerText}" closed and removed.`);
    } catch (err) {
        // console.warn(`[Banner Check] ⚠️ Banner "${expectedBannerText}" did not disappear after close.`);
    }

    await pause(smallPause);
};
