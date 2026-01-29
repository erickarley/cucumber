import setInputfield from '../setInputField';
import waitForDisplayed from '../waitForDisplayed';
import clickElement from '../clickElement';
import pause from '../pause';
import { smallPause } from '../../constants';

/**
 * Enter owner and selects it
 * @param  {String}   fieldValue      The name of the owner
 */
export default async(fieldValue) => {
    /**
    * Selector for the field
    * @type {String}
    */
    const fieldSelector = "//input[@ng-model='itemListWithSearchController.searchBoxValue']";

    /**
    * Selector for the button filter
    * @type {String}
    */
    const ownerButtonSelector = "//button[contains(.,'"+ fieldValue + "')]";
    await pause(smallPause)
    await waitForDisplayed(fieldSelector);
    await setInputfield('set', fieldValue, fieldSelector);
    await clickElement('click','element', ownerButtonSelector);
};