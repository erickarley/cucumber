import setInputfield from '../setInputField';
import clickElement from '../clickElement';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';
import pause from '../pause';
import setFilters from '../Common/setFilters';
import { smallPause } from '../../constants';

/**
 * Selects a widget
 * @param  {String}   dimension           Dimension to Select
 * @param  {String}   dataElement         Data Element to Select
 * @param  {String}   measureGroup        MeasureGroup to select
 * @param  {String}   measureToSelect     Specific Measure to select
 */
export default async(dimension, dataElement, measureGroup, measureToSelect) => {


    /**Selector for the dimension
     * @type {String}
     */
    const dimensionSelector = "//*[@ng-model='metricSelectionController.selectedMappingId']";

    /**
     * Selector for the dimension option
     * @type {String}
     */
    const dimensionOptionSelector = "//md-option[@ng-repeat='option in metricSelectionController.mappingOptions'][.='" + dimension + "']";

    /**Selector for the data Element
     * @type {String}
     */
    const dataElementSelector = "//*[@ng-model='metricSelectionController.selectedDataElementType']";

    /**
     * Selector for the data element option
     * @type {String}
     */
    const dataElementOptionSelector = "//md-option[@ng-repeat='option in metricSelectionController.elementTypes'][.='" + dataElement + "']";

   /**
     * Selector for the filter
     * @type {String}
     */
    const filterSelector = "//input[@ng-model='itemListWithSearchController.searchBoxValue']";

    /**
     * Selector for the Filter to Select
     * @type {String}
     */
    const measureFilterSelector = "//md-list-item[contains(.,'" + measureGroup + "')][1]";

    /**
     * Selector for the Measure to select
     * @type {String}
     */
    const measureSelector = "//md-list-item[contains(.,'" + measureToSelect + "')][1]";

    if (dimension != null) {
        //Select dimension value
        await waitForDisplayed(dimensionSelector);
        await checkIfElementExists(dimensionSelector);
        await clickElement('click','element',dimensionSelector);
        await pause(1000);
        await waitForDisplayed(dimensionOptionSelector);
        await checkIfElementExists(dimensionOptionSelector);
        await clickElement('click','element',dimensionOptionSelector);
    }
    if (dataElement != null) {
        //Select data element value
        await waitForDisplayed(dataElementSelector);
        await checkIfElementExists(dataElementSelector);
        await clickElement('click','element',dataElementSelector);
        await pause(1000);
        await waitForDisplayed(dataElementOptionSelector);
        await checkIfElementExists(dataElementOptionSelector);
        await clickElement('click','element',dataElementOptionSelector);
    }
    await pause(1000);
    if (measureGroup != null) {
        //await setFilters(filterSelector, measureFilterSelector, measureGroup);
        /**
     * Const to receive input to search
     * @type {String}
     */
     const fieldToSelect = measureGroup;
     /**
     * Selector for the option of the filter to choose
     * @type {String}
     */
    const filterItemInList = measureFilterSelector;
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
    }
    await pause(1000);
    if (measureToSelect != null) {
        await clickElement('click','element',measureSelector)
    }
};