import setInputfield from '../setInputField';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';

/**
 * Performs setting of the name for the measure
 * @param  {String}   fieldValue      The name of the measure
 */
export default async(fieldValue) => {
    /**
     * Selector for the field
     * @type {String}
     */
    const fieldSelector = "//input[@name='name']";

    let elementToFind = await $$(fieldSelector);

    if (elementToFind.length > 0) {

        await waitForDisplayed(fieldSelector);
        await checkIfElementExists(fieldSelector);
        await setInputfield('set', fieldValue, fieldSelector);
    }
    else {
        let screenshotName = 'Element-To-Set-Name-To-' + fieldValue + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};