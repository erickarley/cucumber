import setInputfield from '../setInputField';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { longPause } from '../../constants';
import checkAvailability from '../../check/Common/checkAvailability';

/**
 * Performs setting of the name for the report
 * @param  {String}   fieldValue      The name of the dashboard
 */
export default async(fieldValue) => {
    /**
     * Selector for the field
     * @type {String}
     */
    const fieldSelector = "#input_0";
    await checkAvailability();
    
    let elementToFind = await $$(fieldSelector);

    if (elementToFind.length > 0) {
        //Actions of the step   
        await waitForDisplayed(fieldSelector);
        await waitFor(fieldSelector, longPause, null, 'enabled');
        await setInputfield('set', fieldValue, fieldSelector);
    }
    else {
        let screenshotName = 'Dashboard-Name-Set-' + fieldValue + '-ERROR'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};