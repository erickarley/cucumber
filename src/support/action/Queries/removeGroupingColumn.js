import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { bigPause } from '../../constants';

/**
 * Removes columnName from grouping
 * @param {String}      columnName  Column to remove from grouping    
 */

export default async(columnName) => {
    /**
     * Selector for the filter button
     * @type {String}
     */
    // const columnNameRemoveButton = "//span[.="+ columnName + "]/following::a/span[@class='k-icon k-i-close']";
    const columnNameRemoveButton = "//a[@class[contains(.,'k-button k-button-icon k-')]]"
    await waitForDisplayed(columnNameRemoveButton);
    await waitFor(columnNameRemoveButton, bigPause, null, 'enabled');
    await clickElement('click','element',columnNameRemoveButton);
}