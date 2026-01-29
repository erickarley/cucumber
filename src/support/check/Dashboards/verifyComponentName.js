import waitForDisplayed from '../../action/waitForDisplayed';
import checkLoadingOverlay from '../Common/checkLoadingOverlay';
import checkOverlay from '../Common/checkOverlay';

/**
 * Check the content of a div
 * @param  {Type}     expectedName The expected name
 * @param  {Type}     falseCase     Whether to check if the name matches the
 *                                  expected value or not
 */
export default async(expectedName, falseCase) => {
    
    let nameToCheck = await $$("//div[.='" + expectedName + "']");

    await checkOverlay(true);
    await checkLoadingOverlay(false);

    if (nameToCheck.length > 0) {
        await waitForDisplayed("//div[.='" + expectedName + "']");
        /**
         * The name of the report
         * @type {String}
         */
        const name = await $("//div[.='" + expectedName + "']").getText();

        if (falseCase) {
            expect(name).not
                .toEqual(
                    expectedName,
                    `Expected name not to be "${expectedName}"`
                );
        } else {
            expect(name).
                toEqual(
                    expectedName,
                    `Expected name to be "${expectedName}" but found "${name}"`
                );
        }
    } else {
        let screenshotName = 'Component-' + expectedName + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};
