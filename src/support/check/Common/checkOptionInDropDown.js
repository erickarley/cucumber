import waitForDisplayed from '../../action/waitForDisplayed';
import clickElement from '../../action/clickElement';
import isExisting from '../isExisting';
/**
 * Look for the option to select
 * @param  {String}   dropDownSelector     The name of the option to select
 * @param  {String}   optionName      The name of the option to select
 */
export default async (dropDownSelector, optionName) => {
    /**
     * Selector for the option
     * @type {String}
     */
    
        const optiontoSelect = "//md-option//*[.='"+ optionName +"']";

        await waitForDisplayed(dropDownSelector, false);
        await clickElement('click','element',dropDownSelector);
        await isExisting(optiontoSelect,false);
};