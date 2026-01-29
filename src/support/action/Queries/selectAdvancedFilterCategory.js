import clickElement from '../clickElement';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { bigPause } from '../../constants';

/**
 * Category name to Click
 * @param  {String}   categoryName The Category to choose
 */
export default async(categoryName) => {
    /**
     * Selector for the Tile name
     * @type {String}
     */
    const dropdownSelector = "//md-select[@id='grouping-tab-category-select']";

    await waitForDisplayed(dropdownSelector);
    await waitFor(dropdownSelector, bigPause, null, 'enabled');
    await clickElement('click','element',dropdownSelector);

    /**
     * Selector for the Category name
     * @type {String}
     */
     const optionSelector = "/html/body/div[8]/md-select-menu/md-content/md-option[contains(.,'" + categoryName + "')]";

     await waitForDisplayed(optionSelector);
     await waitFor(optionSelector, bigPause, null, 'enabled');
     await clickElement('click','element',optionSelector);
 
}
