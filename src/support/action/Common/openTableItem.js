import clickElement from '../clickElement';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';

/**
 * Open the chosen tableItem
 * @param  {String}   tableItemName      The name of the tableItem to open
 */
export default async(tableItemName) => {
    /**
     * Selector for the tableItemIcon
     * @type {String}
     */
    const tableItemIcon = "//*[@ng-bind='dataItem.title'][contains(.,'"+ tableItemName +"')]/ancestor::tr/td[1]";

    let elementToFind = await $$(tableItemIcon);

    if (elementToFind.length > 0) {
    //Actions of the step
        await waitForDisplayed(tableItemIcon);
        await checkIfElementExists(tableItemIcon);
        await clickElement('click', 'element', tableItemIcon);
    }
    else {
        let screenshotName = 'Table-Item-' + tableItemName + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }    
};