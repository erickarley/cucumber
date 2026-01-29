import setInputfield from '../setInputField';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';

/**
 * Performs setting of a field for the hierarchy
 * @param  {string}   fieldType      The type of the hierarchy field
 * @param  {string}   fieldName      The name of the hierarchy field
 * @param  {string}   fieldValue     The value of the hierarchy field
 */
export default async(fieldType, fieldName, fieldValue) => {
    /**
     * Selector for the field
     * @type {string}
     */
    const fieldSelector = "//" + fieldType + "[@name='" + fieldName + "']";

    let objectToCheck = await $$(fieldSelector);

    if (objectToCheck.length > 0) {
    
        await waitForDisplayed(fieldSelector);
        await checkIfElementExists(fieldSelector);
        await setInputfield('set', fieldValue, fieldSelector);
    }
    else {
        let screenshotName = 'Setting-Hierarchy-Name-' + fieldValue + '-WITH-ERROR'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        screenshotName = screenshotName.replace(/\*/g,'');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};