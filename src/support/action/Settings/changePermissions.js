import pause from '../pause';
import select2020DropDown from '../Common/select2020DropDown';

/**
 * Selects a queryToMeasure
 * @param  {String}   permission      The permission to change
 * @param  {String}   optionToSet     The option to select

 */
export default async(permission, optionToSet) => {
    /**
     * Selector for the drop down
     * @type {String}
     */
    const permissionDropDownSelector = "//label[.='" + permission + ":']/following-sibling::md-select";

    /**
     * Partial Selector for the drop down option
     * @type {String}
     */
    const permissionOptionSelector = "//div[@class='md-select-menu-container md-active md-clickable']//md-option[.='" + optionToSet +"']";

    await pause(1000);
    //Select Category
    await select2020DropDown(permissionDropDownSelector, permissionOptionSelector, optionToSet);
    await pause(1000);};