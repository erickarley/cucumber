import waitForDisplayed from '../../action/waitForDisplayed';
import checkLoadingOverlay from '../Common/checkLoadingOverlay';
import checkOverlay from '../Common/checkOverlay';

/**
 * Check the title of the current browser window
 * @param  {Type}     falseCase     Whether to check if the title matches the
 *                                  expected value or not
 * @param  {Type}     expectedTitle The expected title
 */
export default async (falseCase, expectedTitle) => {
    
    let titleToCheck = await $$(".dashboard-title");

    await checkOverlay(true);
    await checkLoadingOverlay(false);

    if (titleToCheck.length > 0) {
        await waitForDisplayed(".dashboard-title");
        /**
         * The title of the report
         * @type {String}
         */
        const title = await $(".dashboard-title").getText();

        if (falseCase) {
            expect(title).not
                .toEqual(
                    expectedTitle,
                    `Expected title not to be "${expectedTitle}"`
                );
        } else {
            expect(title)
                .toEqual(
                    expectedTitle,
                    `Expected title to be "${expectedTitle}" but found "${title}"`
                );
        }
    } else {
        let screenshotName = 'Title-To-Check-' + expectedTitle + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};
