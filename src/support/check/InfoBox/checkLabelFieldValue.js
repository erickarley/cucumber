import { bigPause } from '../../constants';
import checkLoadingOverlay from '../Common/checkLoadingOverlay';
import checkOverlay from '../Common/checkOverlay';
import pause from '../../action/pause';


/**
 * Check if the given string is in the field
 * @param  {String}   labelName             The label to validate
 * @param  {String}   expectedFieldValue    The string to check for
 * @param  {String}   falseCase             Whether to check if the given string is in or not
 */
export default async(labelName, falseCase, expectedFieldValue) => {
    /**
     * The field selector
     * @type {String}
     */
    const expectedFieldValueSelector = "//label[.='" + labelName + "']/following-sibling::span[.='" + expectedFieldValue +"']";
    
    // const infoboxContentSelector = "//*[@class='panel-content']";
    
    // browser.waitUntil(() => {
    //     return await $(expectedFieldValueSelector).isExisting();
    // });
    await browser.waitUntil(
        async () => (await $(expectedFieldValueSelector).isExisting()),
        {
            timeout: bigPause,
            timeoutMsg: 'Element not visible ' + expectedFieldValueSelector
        }
    );

    // checkOverlay(true);
    // checkLoadingOverlay(true);
    // pause(bigPause);
    let elementToFind = await $$(expectedFieldValueSelector);

    if (elementToFind.length > 0) {
        return true;
    }
    else {
        let screenshotName = 'Label-' + labelName + '-NOT-CONTAINS-VALUE-' + expectedFieldValue; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};