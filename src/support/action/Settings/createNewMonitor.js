import setFilters from '../Common/setFilters';
import select2020DropDown from '../Common/select2020DropDown';
import pause from '../pause';
import clickElement from '../clickElement';
import setInputfield from '../setInputField';
import { smallPause } from '../../constants';

/**
 * Selects the settings for summation
 * @param  {String}   monitorName          Name config
 * @param  {String}   monitorType          Type selection
 * @param  {String}   dimension           Data dimension selection
 * @param  {String}   dataElement         Data element selection
 * @param  {String}   measureName         Measure to select
 * @param  {String}   indicator           Indicator
 */
export default async(monitorName, monitorType, dimension, dataElement , measureName, indicator) => {
    /**Selector for the name
     * @type {String}
     */
     const monitorNameSelector = "#monitorName";

    /**Selector for the type drop down
     * @type {String}
     */
    const monitorTypeSelector = "//md-select[@placeholder='Monitor Type']";

    /**Selector for the option type
     * @type {String}
     */
     const monitorOptionTypeSelector = "//md-option[.='" + monitorType +"']";

    /**Selector for the dimension
     * @type {String}
     */
    const dimensionSelector = "//md-select[@ng-model='metricSelectionController.selectedMappingId']";

    /**
     * Selector for the dimension option
     * @type {String}
     */
    const dimensionOptionSelector = "//md-option[.='" + dimension +"']";

    /**Selector for the dimension
     * @type {String}
     */
    const dataElementSelector = "//md-select[@ng-model='metricSelectionController.selectedDataElementType']";

    /**
     * Selector for the dimension option
     * @type {String}
     */
    const dataElementOptionSelector = "//md-option[.='" + dataElement +"']";

    /**
     * Selector for the filter
     * @type {String}
     */
    const filterSelector = "//input[@ng-model='itemListWithSearchController.searchBoxValue']";

    /**
     * Selector for the first item on the filter list
     * @type {String}
     */
    const firstItemOnFiltersList = "//*[@id='itemListWithSearch']//md-list-item[1]//button";

    /**
     * Selector for the historical data switch
     * @type {String}
     */
    const indicatorSelector = "//span[.='" + indicator + "']/parent::button";

    await pause(smallPause);
    await setInputfield('set',monitorName,monitorNameSelector);
    await select2020DropDown(monitorTypeSelector,monitorOptionTypeSelector,monitorType);
    await select2020DropDown(dimensionSelector,dimensionOptionSelector,dimension);
    await select2020DropDown(dataElementSelector,dataElementOptionSelector,dataElement);
    // await setFilters(filterSelector,firstItemOnFiltersList,measureName);
    /**
     * Const to receive input to search
     * @type {String}
     */
     const fieldToSelect = measureName;
     /**
     * Selector for the option of the filter to choose
     * @type {String}
     */
    const filterItemInList = firstItemOnFiltersList;
    await $(filterSelector).addValue(fieldToSelect);
    await pause(smallPause);
    let listedFilter = await $(filterItemInList);
    if ((await listedFilter.getText()).toUpperCase() == fieldToSelect.toUpperCase()) {
        //await waitForDisplayed(filterItemInList)
        await clickElement('click','element',filterItemInList);
        await pause(smallPause);
    }
    else {
        let screenshotName = 'Error-Filter-' + fieldToSelect + '-NOT-EXISTS';
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
    await pause(1000);
    await clickElement('click','element',indicatorSelector);
}
