import waitForDisplayed from '../../action/waitForDisplayed';
import { bigPause } from '../../constants';

/**
 * Verifies that the breadcrumb matches the expected value.
 * Captures a screenshot if it does not match.
 *
 * @param {string} expectedBreadCrumb - The expected breadcrumb text
 */
export default async (expectedBreadCrumb) => {
    const breadcrumbSelector = "//*[@class='breadcrumb current']/span";

    try {
        // Wait for the breadcrumb element to be present
        await browser.waitUntil(
            async () => await $(breadcrumbSelector).isExisting(),
            {
                timeout: bigPause,
                // timeoutMsg: `[Breadcrumb] ❌ Breadcrumb element not found within timeout: ${breadcrumbSelector}`,
            }
        );

        // Wait until it’s visible (not just present)
        await waitForDisplayed(breadcrumbSelector);

        // Retrieve actual breadcrumb text
        const breadcrumbText = await $(breadcrumbSelector).getText();

        // Assertion
        expect(breadcrumbText).toEqual(
            expectedBreadCrumb,
            `Expected breadcrumb to be "${expectedBreadCrumb}" but found "${breadcrumbText}"`
        );

        // console.log(`[Breadcrumb] ✅ Found expected breadcrumb: "${expectedBreadCrumb}"`);
    } catch (error) {
        const screenshot = `Breadcrumb-Failure-${expectedBreadCrumb.replace(/\s+/g, '-')}-${Date.now()}.png`;
        await browser.saveScreenshot(`./ScreenShots/${screenshot}`);
        // console.warn(`[Breadcrumb] ⚠️ Error validating breadcrumb. Screenshot: ${screenshot}`);
        throw error;
    }
};
