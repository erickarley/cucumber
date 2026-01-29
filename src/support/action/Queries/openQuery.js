import clickElement from '../clickElement';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';

/**
 * Open the chosen report
 * @param  {String}   queryName      The name of the report to open
 */
export default async(queryName) => {
    /**
     * Selector for the queryIcon
     * @type {String}
     */
    const queryIcon = "//*[@ng-bind='dataItem.title'][contains(.,'"+ queryName +"')]/ancestor::tr/td[1]";

    await waitForDisplayed(queryIcon);
    await checkIfElementExists(queryIcon);
    await clickElement('click', 'element', queryIcon);
    
};