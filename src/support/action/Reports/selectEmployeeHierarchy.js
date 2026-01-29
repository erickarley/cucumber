import waitForDisplayed from '../waitForDisplayed';
import pause from '../pause';
import clickElement from '../clickElement';

/**
 * The employee hierarchy name
 * @param  {String}   employeeHierarchyName          The employee hierarchy name
 */
export default async(employeeHierarchyName) => {
    /**
     * Selector for the drop down
     * @type {String}
     */
    const employeeHierarchyDropDownSelector = "//div[.='Employee Hierarchy']/following::md-select[@placeholder='loading hierarchies']";

    /**
     * Partial Selector for the drop down option
     * @type {String}
     */
    const employeeHierarchyOptionSelector = "//md-option[@ng-selected='item.value == hierarchySelection.hierarchyOption'][contains(.,'" + employeeHierarchyName + "')]";


    await waitForDisplayed(employeeHierarchyDropDownSelector);
    await clickElement('click','element',employeeHierarchyDropDownSelector);
    await pause(1000);
    await waitForDisplayed(employeeHierarchyOptionSelector);
    await clickElement('click','element',employeeHierarchyOptionSelector);
    await pause(1000);
};