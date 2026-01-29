import setInputfield from '../setInputField';
import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import pause from '../pause';
import { smallPause } from '../../constants';

/**
 * Selects a widget
 * @param  {String}   transactionTime   Transaction Time
 * @param  {String}   startDate         Transaction start Time
 * @param  {String}   endDate           Transaction end Time
 */
export default async (transactionTime, startDate, endDate) => {
    /**
     * Selector for the transactionTime
     * @type {String}
     */
    const transactionTimeSelector = "//*[@placeholder='Transaction Date/Time']";

    /**
     * Selector for the transactionTime option
     * @type {String}
     */
    const transactionTimeOptionSelector = "//md-option[@ng-repeat='opt in options'][.='" + transactionTime + "']";

    /**
     * Selector for the transaction start Time
     * @type {String}
     */
    const startDateSelector = "//input[@id='start']";

    /**
     * Selector for the transaction end Time
     * @type {String}
     */
    const endDateSelector = "//input[@id='end']";

    if (transactionTime != null) {
        //Select transaction date-time
        // console.log(transactionTime);
        await waitForDisplayed(transactionTimeSelector);
        await clickElement('click','element',transactionTimeSelector);
        await pause(smallPause);
        await waitForDisplayed(transactionTimeOptionSelector);
        await clickElement('click','element',transactionTimeOptionSelector);
    }
    if (transactionTime == 'Exact') {
        if (startDate != null)  {
            await pause(smallPause);
            await waitForDisplayed(startDateSelector);
            await setInputfield('set', startDate, startDateSelector);
        }
        
        if (endDate != null)  {
            await pause(smallPause);
            await waitForDisplayed(endDateSelector);
            await setInputfield('set', endDate, endDateSelector);
        }    
    }
};