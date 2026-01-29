import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { bigPause } from '../../constants';

/**
 * filter name to Click
 * @param  {String}   action The action to perform
 * @param  {String}   filterName The filter to choose
*/
export default async(action,filterName) => {
    /**
     * Selector for the filter name
     * @type {String}
     */
    let deleteBtn4FilterNameSelector = ''
    if (action === 'delete') {
        deleteBtn4FilterNameSelector = "//span[.='" + filterName +"']/ancestor-or-self::div[@class='filterBox']//span[.='Delete']";
    }
    else {
        deleteBtn4FilterNameSelector = "//span[.='" + filterName +"']/ancestor-or-self::div[@class='filterBox']//span[.='Edit']";
    }
    await waitForDisplayed(deleteBtn4FilterNameSelector);
    await waitFor(deleteBtn4FilterNameSelector, bigPause, null, 'enabled');
    await clickElement('click','element',deleteBtn4FilterNameSelector);
}
