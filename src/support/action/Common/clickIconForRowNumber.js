import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { longPause } from '../../constants';

/**
 * Clicks an item on the table on 2020
 * @param  {String}   rowNumber           Number on the Item
 */

export default async(rowNumber) => {
    /**
     * Selector for the menuItem
     * @type {String}
     */
    const rowNumberSelector = "//tr[" + rowNumber + "]/td[1]//ag-md-icon";

    let elementToFind = await $$(rowNumberSelector);

    if (elementToFind.length > 0) {

        await waitForDisplayed(rowNumberSelector);
        await waitFor(rowNumberSelector, longPause, null, 'enabled');
        await clickElement('click','element',rowNumberSelector);
    }
    else {
        let screenshotName = 'Button-On-Row-' + rowNumber + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
}
