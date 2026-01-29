import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { bigPause } from '../../constants';

/**
 * Item to edit
 * @param {String}      infoBoxName     Item to edit
 */

export default async(infoBoxName) => {
    /**
     * Selector for the button
     * @type {String}
     */
    const itemEditButtonSelector = "//span[.='"+ infoBoxName +"']/following::button[1]";

    await waitForDisplayed(itemEditButtonSelector);
    await waitFor(itemEditButtonSelector, bigPause, null, 'enabled');
    await clickElement('click','element',itemEditButtonSelector);
};