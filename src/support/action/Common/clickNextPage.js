import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { bigPause } from '../../constants';

/**
 * Selects all rows after download option select receipts is called
 */
export default async() => {
    /**
     * Selector for the Tile name
     * @type {String}
     */
    const nextPageSelector = "//a/span[@class='k-icon k-i-arrow-60-right']";

    await waitForDisplayed(nextPageSelector);
    await waitFor(nextPageSelector, bigPause, null, 'enabled');
    await clickElement('click','element',nextPageSelector);
}
