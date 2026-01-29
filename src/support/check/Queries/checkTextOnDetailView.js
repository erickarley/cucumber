import isExisting from '../isExisting';
import waitForDisplayed from '../../action/waitForDisplayed';
import pause from '../../action/pause';
import { mediumPause, smallPause } from '../../constants';

/**
 * Check if the given string is in receipt in the detail view
 * @param  {String}   expectedText The string to check for
 */
export default async(expectedText) => {
    /**
     * The expected text selector
     * @type {String}
     */
    const textOnReceiptSelector = "//span[@class[contains(.,'line')]][contains(.,'"+ expectedText + "')]";

    await waitForDisplayed(textOnReceiptSelector);
    await isExisting(textOnReceiptSelector,false);
    await pause(smallPause);
};
