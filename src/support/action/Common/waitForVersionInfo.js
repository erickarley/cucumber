/**
 * Waits for the version number element to appear and be visible.
 */
export default async () => {
    const versionSelector = "//div[@class='about-main-area']/div[2]";

    await browser.waitUntil(
        async () => {
            const versionElement = await $(versionSelector);
            return await versionElement.isDisplayed();
        },
        {
            timeout: 10000,
            timeoutMsg: 'Version number was not visible within the expected time.'
        }
    );
};
