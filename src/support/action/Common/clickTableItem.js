import clickElement from '../clickElement';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';
import { bigPause } from '../../constants';

/**
 * click the chosen cell content
 * @param  {String}   tableItemRowNumber      The row to explore
 * @param  {String}   tableItemCellNumber     The number of the cell for that row
 */
export default async(tableItemCellNumber, tableItemRowNumber) => {
    /**
     * Selector for the table Item
     * @type {String}
     */
    const tableItemIcon = "//table[@role]//tr[" + tableItemRowNumber + "]/td[" + tableItemCellNumber + "]//span";

    let iconToClick = await $$(tableItemIcon);

    if (iconToClick.length > 0) {

        // await waitForDisplayed(tableItemIcon);
        // await checkIfElementExists(tableItemIcon);
        await browser.waitUntil(
            async () => (await $(tableItemIcon).isExisting()),
            {
                timeout: bigPause,
                timeoutMsg: 'Element not visible ' + tableItemIcon
            }
        );
        await clickElement('click', 'element', tableItemIcon);
    }
    else {
        let screenshotName = 'Item-On-Row-' + tableItemRowNumber + '-Cell-' + tableItemCellNumber + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};