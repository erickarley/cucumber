import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { bigPause } from '../../constants';

/**
 * row number to click
 * @param  {Number}   rowNumber  The row number
 * @param  {Number}   cellNumber The cell number
 */
export default async(rowNumber, cellNumber) => {
    /**
     * Selector for the cell
     * @type {String}
     */
    const queryCellSelector = "//tr[" + rowNumber +"]/td[" + cellNumber +"]";

    await waitForDisplayed(queryCellSelector);
    await waitFor(queryCellSelector, bigPause, null, 'enabled');
    await clickElement('click','element',queryCellSelector);
}
