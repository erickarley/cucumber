import waitForDisplayed from '../waitForDisplayed';
import clickElement from '../clickElement';
import isExisting from '../../check/isExisting';
/**
 * Look for the option to select
 * @param  {String}   optionName        The name of the option to select
 * @param  {String}   dropDownSelector  The name of the option to select
 */
export default async (optionName, dropDownSelector) => {
    /**
     * Selector for the option
     * @type {String}
     */
    
        const optiontoSelector = "//*[contains(@class, 'md-active')]//md-option//*[.='"+ optionName +"']";

        await waitForDisplayed(dropDownSelector, false);
        await clickElement('click','element',dropDownSelector);
        await clickElement('click', 'element',optiontoSelector);
};