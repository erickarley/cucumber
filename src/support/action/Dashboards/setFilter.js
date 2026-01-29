import setInputfield from '../setInputField';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';
import pressButton from '../pressButton';
import pause from '../pause';

/**
 * Performs login with the following credentials
 * @param  {String}   filterName      The name of the report to open
 */
export default async(filterValue, filterName) => {
    /**
     * Selector for the filter
     * @type {String}
     */
    const filterSelector = "//tr[@class='k-filter-row']/th//*[@aria-label='"+ filterName +"']";
    
    let elementToFind = await $$(filterSelector);

    if (elementToFind.length > 0) {
        // await waitForDisplayed(filterSelector);
        // await checkIfElementExists(filterSelector);
        await setInputfield('set',filterValue,filterSelector);
        await pause(1000);
        await pressButton('Enter');    
    }
    else {
        let screenshotName = 'Filter-Setting-' + filterName; + '-ERROR'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
    
};