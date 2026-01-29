import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { bigPause } from '../../constants';

/**
 * Row number to select
 * @param {String}      rowNumber     The row to select
 */

export default async(rowNumber) => {
    /**
     * Selector for the button
     * @type {String}
     */
    const videoIconSelector = "//tr["+ rowNumber +"]/td[1]//ng-bind-html/ancestor::td";

    await waitForDisplayed(videoIconSelector);
    await waitFor(videoIconSelector, bigPause, null, 'enabled');
    await clickElement('click','element',videoIconSelector);
}