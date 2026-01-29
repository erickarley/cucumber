import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';
import pause from '../pause';
import clickElement from '../clickElement';
import { mediumPause } from '../../constants';


/**
 * The store hierarchy name
 * @param  {String}   storeHierarchyName          The store hierarchy name
 */
export default async(storeHierarchyName) => {
    /**
     * Selector for the drop down
     * @type {String}
     */
    const storeHierarchyDropDownSelector = "//md-select[@ng-model='hierarchySelection.hierarchyOption']/md-select-value/span[contains(.,'" + storeHierarchyName +"')]";

    /**
     * Partial Selector for the drop down option
     * @type {String}
     */
    const storeHierarchyOptionSelector = "//div[@aria-hidden='false']/md-select-menu[@role='presentation']//md-option/div[contains(.,'" + storeHierarchyName + "')]";

    await pause(mediumPause);
    await waitForDisplayed(storeHierarchyDropDownSelector);
    await checkIfElementExists(storeHierarchyDropDownSelector);
    await clickElement('click','element',storeHierarchyDropDownSelector);
    await pause(1000);
    await waitForDisplayed(storeHierarchyOptionSelector);
    await checkIfElementExists(storeHierarchyOptionSelector);
    await clickElement('click','element',storeHierarchyOptionSelector);
    await pause(1000);
};