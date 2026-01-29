import clickElement from '../clickElement';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';

/**
 * Clicks an item on the table on 2020
 * @param  {String}   rowNumber           Number on the Item
 */

export default async(rowNumber) => {
    /**
     * Selector for the menuItem
     * @type {String}
     */
    const rowNumberSelector = "//div[@kendo-grid='controller.transactionsGrid']/div[@class[contains(.,'k-grid-content')]]//tr[" + rowNumber + "]";

    let elementToFind = await $$(rowNumberSelector);

    if (elementToFind.length > 0) {
        //Actions of the step
        await waitForDisplayed(rowNumberSelector);
        await checkIfElementExists(rowNumberSelector);
        await clickElement('click','element',rowNumberSelector);
    }
    else {
        let screenshotName = 'Alert-Group-Transaction-' + rowNumber + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
}
