import checkAvailability from '../Common/checkAvailability';

export default async (falseCase, expectedTitle) => {
    const timeoutArg = process.argv.find(arg => arg.startsWith('--timeout='));
    const dynamicTimeout = timeoutArg ? parseInt(timeoutArg.split('=')[1], 10) : 100000;

    const titleSelector = '#reportName';

    try {
        // console.log("[Report Title Check] Checking page availability...");
        await checkAvailability(); // Make sure the app isn't mid-transition

        // console.log("[Report Title Check] Waiting for element to exist...");
        const titleEl = await $(titleSelector);
        await titleEl.waitForExist({ timeout: dynamicTimeout });

        // console.log("[Report Title Check] Waiting for element to be visible...");
        await titleEl.waitForDisplayed({ timeout: dynamicTimeout });

        const title = await titleEl.getValue();
        console.log(`[Report Title Check] Title found: "${title}"`);

        if (!title || title.trim() === '') {
            throw new Error(`[Report Title Check] Found element, but title is empty`);
        }

        const actual = title.toLowerCase();
        const expected = expectedTitle.toLowerCase();

        if (falseCase) {
            expect(actual).not.toEqual(expected, `Expected report title NOT to be "${expectedTitle}"`);
        } else {
            expect(actual).toEqual(expected, `Expected report title to be "${expectedTitle}" but found "${title}"`);
        }

    } catch (e) {
        const screenshotName = `./ScreenShots/ReportTitleError-${Date.now()}.png`;
        await browser.saveScreenshot(screenshotName);
        console.error(`[Report Title Check] Error: ${e.message}`);
        throw new Error(`[Report Title Check] Failed. Screenshot saved: ${screenshotName}`);
    }
};
