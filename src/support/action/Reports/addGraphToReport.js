import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { longPause } from '../../constants';
import pause from '../pause';

/**
 * Data Element to Click
 */
    export default async() => {
    /**
     * Selector for the dataElement
     * @type {String}
     */
    const buttonToClick = "#graphToggleButton"

    await waitForDisplayed(buttonToClick);
    await waitFor(buttonToClick,longPause, null, 'enabled');
    await clickElement('click','element',buttonToClick);
    await pause(1000);
}
