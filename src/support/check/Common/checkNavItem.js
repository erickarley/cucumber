/**
 * Check if a navigation item is displayed or not
 * @param {String} expectedNavigationItemName
 * @param {String} falseCase (" not" or undefined)
 */
export default async (expectedNavigationItemName, falseCase) => {

    const selector =
        `//button[@aria-label='${expectedNavigationItemName}']`;

    const el = await $(selector);
    const shouldBeDisplayed = !falseCase;

    if (shouldBeDisplayed) {
        await el.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: `[Nav] "${expectedNavigationItemName}" expected to be displayed`
        });
    } else {
        // Wait until it is either hidden or not displayed
        await browser.waitUntil(
            async () => {
                if (!(await el.isExisting())) return true;
                return !(await el.isDisplayed());
            },
            {
                timeout: 10000,
                interval: 300,
                timeoutMsg: `[Nav] "${expectedNavigationItemName}" still displayed`
            }
        );
    }
};
