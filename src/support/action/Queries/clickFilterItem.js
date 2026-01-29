import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { bigPause } from '../../constants';

/**
 * Filter to select
 * @param {String}      filterText     Filter text to click
 */

export default async(filterText) => {
    /**
     * Selector for the filter button
     * @type {String}
     */
    const filterButtonSelector = "//filter-item//span[.='"+ filterText +"']";

    await waitForDisplayed(filterButtonSelector);
    await waitFor(filterButtonSelector, bigPause, null, 'enabled');
    await clickElement('click','element',filterButtonSelector);
}