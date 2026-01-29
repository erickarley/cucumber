import clickElement from '../clickElement';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';

/**
 * Open the chosen report
 * @param  {Number}   rowNumber      The number of the report to open
 */
export default async(rowNumber) => {
    /**
     * Selector for the reportIcon
     * @type {String}
     */
    const reportIcon = "//tr[" + rowNumber + "]/td[1]";

    // await waitForDisplayed(reportIcon);
    // await checkIfElementExists(reportIcon);
    await clickElement('click', 'element', reportIcon);
    
};