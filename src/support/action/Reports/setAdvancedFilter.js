import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { longPause, smallPause } from '../../constants';
import pause from '../pause';

/**
 * Data Element to Click
 * @param  {String}   filterType The dataElement to choose
 * @param {String}    firstValue The first value
 * @param {String}    secondValue The second value
 */
    export default async(filterType, firstValue, secondValue) => {
    /**
     * Selector for the filterType dropdown
     * @type {String}
     */
    const filterTypeDDSelector = "//md-select[@placeholder='Filter Type']";

    /**
     * Selector for the filterType dropdown
     * @type {String}
     */
    const filterOptionSelector = "//md-option[@ng-repeat='item in filterDialogCtrl.filterOptions | filter: filterDialogCtrl.filter(filterDialogCtrl.selectedColumn) '][.='Threshold']"
    
    /**
     * Selector for the filterType dropdown
     * @type {String}
     */
    const firstValueSwitchSelector = '';


    await waitForDisplayed(filterTypeDDSelector);
    await clickElement('click','element',filterTypeDDSelector);
    await pause(smallPause);
    await clickElement('click', 'element', filterOptionSelector);

}
