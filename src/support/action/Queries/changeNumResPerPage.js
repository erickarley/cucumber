import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { bigPause } from '../../constants';

/**
 * Change the number of records on the results
 * @param {String}      numberOfRecords     Number or records
 */
export default async(numberOfRecords) => {
    /**
     * Selector for the dropdown name
     * @type {String}
     */
    const numberOfRecordsPerPageSelector = "//span[@class='k-widget k-dropdown']/span";

    await waitForDisplayed(numberOfRecordsPerPageSelector);
    await waitFor(numberOfRecordsPerPageSelector, bigPause, null, 'enabled');
    await clickElement('click','element',numberOfRecordsPerPageSelector);

    /**
     * Selector for the Tile name
     * @type {String}
     */
     const numberSelectionSelector = "//li[.='" +  numberOfRecords +"']";

     await waitForDisplayed(numberSelectionSelector);
     await waitFor(numberSelectionSelector, bigPause, null, 'enabled');
     await clickElement('click','element',numberSelectionSelector);
 
}
