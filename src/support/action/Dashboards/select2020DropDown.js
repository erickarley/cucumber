import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';
import clickElement from '../clickElement';
import pause from '../pause';

/**
 * Look for the option to select
 * @param  {String}   selectLabel     The name of the option to select
 * @param  {String}   optionName      The name of the option to select
 */
export default async(selectLabel, optionName) => {
    /**
     * Selector for the Dropdown
     * @type {String}
     */
    const dropDowntoOpen = "//*[@class='selectLabel'][.='" + selectLabel + "']/parent::div/md-select";

    /**
     * Selector for the option
     * @type {String}
     */
    const optiontoSelect = "//md-option[.='"+ optionName +"']";

    let elementToFind = await $$(dropDowntoOpen);

    if (elementToFind.length > 0) {
        await waitForDisplayed(dropDowntoOpen);
        await checkIfElementExists(dropDowntoOpen);
        await clickElement('click','element',dropDowntoOpen);
        await pause(1000);
        await waitForDisplayed(optiontoSelect);
        await checkIfElementExists(optiontoSelect);
        await clickElement('click','element',optiontoSelect);    
    }
    else {
        let screenshotName = 'Dashboard-2020-Dropdown-Option-' + optionName + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};