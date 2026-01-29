import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { bigPause } from '../../constants';

/**
 * column to select
 * @param {String}      columnNumber     column text to click
 */

export default async(columnNumber) => {
    /**
     * Selector for the column button
     * @type {String}
     */
    const distinctColumnSelector = "//table[@role='grid']//tr["+ columnNumber +"]/td[4]/span";

    await waitForDisplayed(distinctColumnSelector);
    await waitFor(distinctColumnSelector, bigPause, null, 'enabled');
    await clickElement('click','element',distinctColumnSelector);
}