import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { bigPause, smallPause } from '../../constants';
import setInputfield from '../setInputField';
import pause from '../pause';

/**
 * operator to select
 * @param {String}      selection     category to set
 * @param {String}      operator     operator to set
 * @param {String}      value     value to set
 */

export default async(selection, operator, value) => {
    /**
     * Selector for the operator button
     * @type {String}
     */
    let operatorSelector = '';
    let valueSelector =  '';
    
    if (selection == 'event') {
        operatorSelector = "//div[@class='group-by-options-container']//span[.='" + operator + "']";
        valueSelector = "//div[@class='group-by-options-container']//input";
    }
    else {
        operatorSelector = "//div[@class='distinct-options-container']//span[.='" + operator + "']";
        valueSelector = "//div[@class='distinct-options-container']//input";

    }
    let elementToFind = await $$(operatorSelector);
    let newFlag = false;
    if (elementToFind.length == 0) {
        newFlag = true;
        if (selection == 'event') {
            operatorSelector = "//ag-removable-noun-list[@class='group-by']/following-sibling::ag-removable-noun-filter//span[@class='md-select-icon']"
            valueSelector = "//ag-removable-noun-list[@class='group-by']/following-sibling::ag-removable-noun-filter//input[contains(@class,'k-formatted-value')]"
        }
        else {
            operatorSelector = "//ag-removable-noun-list[@class='distinct']/following-sibling::ag-removable-noun-filter//span[@class='md-select-icon']"
            valueSelector = "//ag-removable-noun-list[@class='distinct']/following-sibling::ag-removable-noun-filter//input[contains(@class,'k-formatted-value')]"
        }
    }
    if (!newFlag) {
        await waitForDisplayed(operatorSelector);
        await waitFor(operatorSelector, bigPause, null, 'enabled');
        await clickElement('click','element',operatorSelector);
        await pause(smallPause);
    }
    await setInputfield('set', value, valueSelector);
}