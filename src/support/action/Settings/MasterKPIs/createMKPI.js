import setFilters from '../../Common/setFilters';
import select2020DropDown from '../../Common/select2020DropDown';
import pause from '../../pause';
import clickElement from '../../clickElement';
import setInputField from '../../setInputField';
import { smallPause } from '../../../constants';

/**
 * Selects the settings for summation
 * @param  {String}   kpiName          Name config
 * @param  {String}   kpiType          Type selection
 * @param  {String}   dimension           dimension selection
 * @param  {String}   dataElement         Data element selection
 * @param  {String}   measureName         Measure to select
 * @param  {String}   indicator           Indicator
 */
export default async(kpiName, kpiType, dimension, dataElement, measureName, indicator) => {
    /**Selector for the name
     * @type {String}
     */
    const kpiNameSelector = "#kpiName";

    /**Selector for the name
     * @type {String}
     */
    const kpiTypeSelector = "//div[@class='md-label'][.='" + kpiType + "']/ancestor::md-radio-button";

    /**Selector for the dimension
     * @type {String}
     */
    const dimensionSelector = "//md-select[@ng-model='metricSelectionController.selectedMappingId']";

    /**
     * Selector for the dimension option
     * @type {String}
     */
    const dimensionOptionSelector = "//md-option[@ng-repeat='option in metricSelectionController.mappingOptions'][.='" + dimension +"']";

    /**Selector for the dimension
     * @type {String}
     */
    const dataElementSelector = "//md-select[@ng-model='metricSelectionController.selectedDataElementType']";

    /**
      * Selector for the dimension option
      * @type {String}
      */
    const dataElementOptionSelector = "//md-option[@ng-repeat='option in metricSelectionController.elementTypes'][.='" + dataElement +"']";

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
    await setInputfield('set',kpiName,kpiNameSelector);
    await pause(1000);
    await clickElement('click','element',kpiTypeSelector);
    await pause(1000);
    await select2020DropDown(dimensionSelector,dimensionOptionSelector,dimension);
    await pause(1000);
    await select2020DropDown(dataElementSelector,dataElementOptionSelector,dataElement);
    await pause(1000);
    await setFilters(filterSelector,firstItemOnFiltersList,measureName);
    await pause(1000);
    await clickElement('doubleClick','element',indicatorSelector);
    await pause(1000);
}
