import setInputfield from '../setInputField';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';

/**
 * Performs setting of the name for the manual hierarchy
 * @param  {string}   fieldValue     The value of the hierarchy field
 */
export default async(fieldValue) => {
    /**
     * Selector for the field
     * @type {string}
     */
    const fieldSelector = "#Name";

    let objectToCheck = await $$(fieldSelector);

    if (objectToCheck.length > 0) {
    
        await waitForDisplayed(fieldSelector);
        await checkIfElementExists(fieldSelector);
        await setInputfield('set', fieldValue, fieldSelector);
    }
    else {
        let screenshotName = 'Setting-Manual-Hierarchy-Name-' + fieldValue + '-WITH-ERROR'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        screenshotName = screenshotName.replace(/\*/g,'');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};