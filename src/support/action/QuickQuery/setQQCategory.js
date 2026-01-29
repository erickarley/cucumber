import clickElement from '../clickElement';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';
import pause from '../pause';

/**
 * Selects a widget
 * @param  {String}   categoryName           Transaction Time
 */

export default async (categoryName) => {
    /**
     * Selector for the categoryName
     * @type {String}
     */
    const categoryNameSelector = "//*[@placeholder='Choose Category']";

    /**
     * Selector for the categoryName option
     * @type {String}
     */
    const categoryNameOptionSelector = "//md-option[@data-ng-repeat[contains(.,'dc in dcCtrl.filterCategories')]][.='" + categoryName + "']";

    if (categoryName != null) {
        //Select category
        await waitForDisplayed(categoryNameSelector);
        await checkIfElementExists(categoryNameSelector);
        await clickElement('click','element',categoryNameSelector);
        await pause(1000);
        await waitForDisplayed(categoryNameOptionSelector);
        await checkIfElementExists(categoryNameOptionSelector);
        await clickElement('click','element',categoryNameOptionSelector);
        await pause(2000);
    }
    
};