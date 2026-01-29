import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { longPause } from '../../constants';
import pause from '../pause';
import select2020DropDown from '../Common/select2020DropDown';
import setInputfield from '../setInputField';

/**
 * Data Element to Click
 * @param  {String}   menuItem The menu item to choose
 * @param  {String}   columnName The name of the column to choose
*/
export default async(menuItem, columnName) => {
    /**
     * Selector for the dataElement column 
     * @type {String}
     */
    const dataElementMeasureSelector = "//th[@data-title='" +  columnName + "']/a/span[@class='k-icon k-i-more-vertical']";

    /**
     * Selector for the column menu item
     * @type {String}
     */
    const menuItemSelector = "//span[.='" + menuItem + "']";

    await waitForDisplayed(dataElementMeasureSelector);
    await waitFor(dataElementMeasureSelector,longPause, null, 'enabled');
    // console.log('before click on ...');
    await clickElement('click','element',dataElementMeasureSelector);
    await pause(2000);
    await clickElement('click','element',dataElementMeasureSelector);
    await pause(2000);
    await clickElement('click','element',dataElementMeasureSelector);
    await pause(2000);
    await waitForDisplayed(menuItemSelector);
    await waitFor(menuItemSelector,longPause, null, 'enabled');
    // console.log('advance filter click');
    await clickElement('click','element',menuItemSelector);
    await pause(3000);
}
