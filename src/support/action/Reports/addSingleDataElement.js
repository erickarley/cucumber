import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { bigPause, smallPause } from '../../constants';
import pause from '../pause';
import clickButton from '../Common/clickButton';
import setFilters from '../Common/setFilters';
import clearInputField from '../clearInputField';

/**
 * Data Element to Add
 * @param  {String}   dataElementName The dataElement to choose
 */
export default async(dataElementName) => {

    /**
     * Selector for the dataElement searchbox
     * @type {String}
     */
    const dataElementSearchSelector = 
        "//*[@id='measureElements']/md-list/md-list-item/div/button/span[text()='" + dataElementName + "']";

////*[@id="measureElements"]/md-list/md-list-item/div/button/span[text()="Order Total (Following Transaction) ($)"]
    /**
     * Selector for the dataElement
     * @type {String}
     */
   
    let elements = await $$(dataElementSearchSelector);

    if (elements.length == 0) {
        throw Error("Could not find single data element '" + dataElementName + "'");
    }

    let element = await elements[0].parentElement();

    await $(element).doubleClick();
}
