import setInputfield from '../setInputField';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';

/**
 * Performs setting of the name for the query
 * @param  {String}   fieldValue      The name of the query
 */
export default async(fieldValue) => {
    /**
     * Selector for the field
     * @type {String}
     */
    const fieldSelector = "//input[@name='name']";
    
    await waitForDisplayed(fieldSelector);
    await checkIfElementExists(fieldSelector);
    await setInputfield('set', fieldValue, fieldSelector);
};