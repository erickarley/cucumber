import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { bigPause } from '../../constants';

export default async() => {
    /**
     * Selector for the cell
     * @type {String}
     */
    const detailViewSelector = "//div[contains(.,'Detail View')]";

    await waitForDisplayed(detailViewSelector);
    await waitFor(detailViewSelector, bigPause, null, 'enabled');
    await clickElement('click','element',detailViewSelector);
}
