import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { bigPause } from '../../constants';

/**
 * Filter to select
 * @param {String}      filterText     Filter text to click
 */

export default async() => {
    /**
     * Selector for the filter button
     * @type {String}
     */
    const groupingOptionsButtonSelector = "#stickyGroupOptions-btn";

    await waitForDisplayed(groupingOptionsButtonSelector);
    await waitFor(groupingOptionsButtonSelector, bigPause, null, 'enabled');
    await clickElement('click','element',groupingOptionsButtonSelector);
}