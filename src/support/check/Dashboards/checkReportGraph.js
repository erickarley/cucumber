import waitForDisplayed from '../../action/waitForDisplayed';
import checkAvailability from '../Common/checkAvailability';
import checkLoadingOverlay from '../Common/checkLoadingOverlay';
import checkOverlay from '../Common/checkOverlay';

/**
 * Check the Content of the current browser window
 * @param  {Type}     falseCase     Whether to check if the Content matches the
 *                                  expected value or not
 * @param  {Type}     expectedContent The expected Content
 */
export default async(falseCase, expectedContent) => {
    let graphSelector = "//div[@ng-show='reportController.showAsGraph() && reportController.isGraphCreated()'][@aria-hidden='false']"
    let contentToCheck = await $$(graphSelector);

    // await checkOverlay(true);
    // await checkLoadingOverlay(false);
    await checkAvailability();

    if (contentToCheck.length > 0) {
        await waitForDisplayed(graphSelector);
        /**
         * The Content of the report
         * @type {String}
         */
        const content = await $(graphSelector).getText();
        // console.log(content);

        if (falseCase) {
            expect(content).to.not
                .contain(
                    expectedContent,
                    `Expected text not to contain "${expectedContent}"`
                );
        } else {
            expect(content).to
                .contain(
                    expectedContent,
                    `Expected Text to contain "${expectedContent}" but found "${content}"`
                );
        }
    } else {
        if (falseCase) {
            // console.log("Element Not Found Is Expected");
            return true;
        }
        else {

            let screenshotName = 'Text-To-Check-On-Graph-' + expectedContent + '-NOT-EXISTS'; 
            screenshotName = screenshotName.replace(/\//g,'-');
            await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
            throw Error(screenshotName);
        }
    }
};
