import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { bigPause } from '../../constants';

export default async() => {
    /**
     * Selector for the filter name
     * @type {String}
     */
    const deleteDefaultFilterSelector = "//span[.='Delete']";

    await waitForDisplayed(deleteDefaultFilterSelector);
    await waitFor(deleteDefaultFilterSelector, bigPause, null, 'enabled');
    await clickElement('click','element',deleteDefaultFilterSelector);
}
