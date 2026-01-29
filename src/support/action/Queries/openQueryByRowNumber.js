import clickElement from '../clickElement';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';

/**
 * Open the chosen report
 * @param  {String}   rowNumber      The row number of the report to open
 */
export default async(rowNumber) => {
    /**
     * Selector for the queryIcon
     * @type {String}
     */
    const queryIcon = "//tr[" + rowNumber +"]/td[1]";

    await waitForDisplayed(queryIcon);
    await checkIfElementExists(queryIcon);
    await clickElement('click', 'element', queryIcon);
    
};