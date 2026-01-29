import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';
import clickElement from '../clickElement';

/**
 * Look for the filter to clear
 * @param  {String}   filterName      The name of the filter to clear
 */
export default async(filterName) => {
    /**
     * Selector for the filter
     * @type {String}
     */
    const filterClearButtonSelector = "//*[@aria-label='"+ filterName +"']/following::button[1]";
    
    let elementToFind = await $$(filterClearButtonSelector);

    if (elementToFind.length > 0) {
    //Actions of the step
        await waitForDisplayed(filterClearButtonSelector);
        await checkIfElementExists(filterClearButtonSelector);
        await clickElement('click','button',filterClearButtonSelector);    
    }
    else {
        let screenshotName = 'Filter-To-Clear-' + filterName + '-NOT-EXISTS'; 
        screenshotName = screenshotNamSwitch-Iteme.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};