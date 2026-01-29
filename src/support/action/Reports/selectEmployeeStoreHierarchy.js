import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';
import pause from '../pause';
import clickElement from '../clickElement';


/**
 * To use when the Report type is employee
 * The store hierarchy name
 * @param  {String}   storeHierarchyName          The store hierarchy name
 */
export default async(storeHierarchyName) => {
    /**
     * Selector for the drop down
     * @type {String}
     */
    const storeHierarchyDropDownSelector = "//div[@is-store='false']//md-select";

    /**
     * Partial Selector for the drop down option
     * @type {String}
     */
    const storeHierarchyOptionSelector = "//md-select-menu[@class='_md md-overflow']//md-option[contains(.,'" + storeHierarchyName + "')]";


    await waitForDisplayed(storeHierarchyDropDownSelector);
    await checkIfElementExists(storeHierarchyDropDownSelector);
    await clickElement('click','element',storeHierarchyDropDownSelector);
    await pause(1000);
    await waitForDisplayed(storeHierarchyOptionSelector);
    await checkIfElementExists(storeHierarchyOptionSelector);
    await clickElement('click','element',storeHierarchyOptionSelector);
    await pause(1000);
};