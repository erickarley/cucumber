import setInputfield from '../setInputField';
import waitForDisplayed from '../waitForDisplayed';

/**
 * Performs setting of the days to backfill
 * @param  {String}   fieldValue      The number of days
 */
export default async(fieldValue) => {
    /**
     * Selector for the field
     * @type {String}
     */
    const fieldSelector = "//md-dialog//input[@name='backfill']";
    
    await setInputfield('set', fieldValue, fieldSelector);
};