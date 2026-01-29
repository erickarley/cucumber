import clickElement from '../clickElement';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';

/**
 * Open the chosen report
 * @param  {String}   reportName      The name of the report to open
 */
export default async (reportName) => {
    /**
     * Selector for the reportIcon
     * @type {String}
     */
    const reportIcon = "//*[@ng-bind='dataItem.title'][translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')=translate('" + reportName + "', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')]/ancestor::tr/td[1]";

    try {
        // // Set a timeout for waitForDisplayed
        // await waitForDisplayed(reportIcon, { timeout: 5000 });

        // // Check if the element exists within the timeout period
        // await checkIfElementExists(reportIcon, { timeout: 5000 });

        // Click the element if found
        await clickElement('click', 'element', reportIcon);
    } catch (error) {
        console.error(`Failed to open report "${reportName}": ${error.message}`);
        throw new Error(`Report "${reportName}" was not found or could not be opened.`);
    }
};
