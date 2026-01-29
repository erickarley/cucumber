import setInputfield from '../setInputField';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';
import pressButton from '../pressButton';
import pause from '../pause';

/**
 * Sets a value on a filter header for a table
 * @param  {String}   headerFilterName      The name of the filter to set
 * @param  {String}   filterValue           The value to set
 */
export default async(headerFilterName, filterValue) => {
    /**
     * Selector for the filter
     * @type {String}
     */
    const headerFilterSelector = "//th//*[@aria-label='"+ headerFilterName +"']";
    let elementToFind = await $$(headerFilterSelector);

    if (elementToFind.length > 0) {
    //Actions of the step
        await waitForDisplayed(headerFilterSelector);
        await checkIfElementExists(headerFilterSelector);
        await setInputfield('set',filterValue,headerFilterSelector);
        await pause(1000);
        await pressButton('Enter');
    }
    else {
        let screenshotName = 'Table-Header-Filter' + headerFilterName + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }    
};