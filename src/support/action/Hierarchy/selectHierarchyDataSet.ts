import checkAvailability from '../../check/Common/checkAvailability';
import pause from '../pause';
import select2020DropDown from '../Common/select2020DropDown';

/**
 * Selects a queryToMeasure
 * @param  {String}   dataSetName   The name of the aggregation level to change to

 */
export default async(dataSetName: string) => {
    /**
     * Selector for the Aggregation Level drop down
     * @type {String}
     */
    const dataSetDDSelector = "//div[contains(text(), 'Data Set')]/following-sibling::md-select";

    /**
     * Partial Selector for the drop down option
     * @type {String}
     */
    const dataSetOptionSelector = "//div[contains(text(),'" + dataSetName + "')]//parent::md-option[contains(@ng-repeat,'autoHierarchyController.masterDataTypes')]";

    //Select Aggregation Level
    await checkAvailability("null");
    await select2020DropDown(dataSetDDSelector, dataSetOptionSelector, dataSetName);
    await checkAvailability("null");
    await pause("5000");
};