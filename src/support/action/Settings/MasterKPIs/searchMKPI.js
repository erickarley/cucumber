import setInputfield from '../../setInputfield';
import checkIfElementExists from '../../../lib/checkIfElementExists';
import waitForDisplayed from '../../waitForDisplayed';
import pause from '../../pause';
import pressButton from '../../pressButton';

/**
 * Enters name in query
 * @param  {String}   kpiName      The name of the KPI
 */
export default async(kpiName) => {
    /**
     * Selector for the field
     * @type {String}
     */
    const fieldSelector = "//input[@aria-label='KPI Name']";
    
    await waitForDisplayed(fieldSelector);
    await checkIfElementExists(fieldSelector);
    await setInputfield('set', kpiName, fieldSelector);
    await pause(1000);
    await pressButton('Enter');
};