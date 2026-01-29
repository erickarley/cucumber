import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { bigPause } from '../../constants';

/**
 * Item to edit
 * @param {String}      itemName     Item to edit
 */

export default async(itemName) => {
    /**
     * Selector for the button
     * @type {String}
     */
    const itemEditButtonSelector = "//span[.='"+ itemName +"']/ancestor::tr/td[1]//button";

    await waitForDisplayed(itemEditButtonSelector);
    await waitFor(itemEditButtonSelector, bigPause, null, 'enabled');
    await clickElement('click','element',itemEditButtonSelector);
};