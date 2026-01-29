import checkAvailability from '../../check/Common/checkAvailability';
import pause from '../pause';
import select2020DropDown from '../Common/select2020DropDown';

/**
 * Selects a queryToMeasure
 * @param  {String}   oldAggregationLevelName   The name of the existing aggregation level to change
 * @param  {String}   newAggregationLevelName   The name of the aggregation level to change to

 */
export default async(oldAggregationLevelName: string, newAggregationLevelName: string) => {
    /**
     * Selector for the Aggregation Level drop down
     * @type {String}
     */
    const aggregationLevelDDSelector = "//*[contains(text(),'" + oldAggregationLevelName + "')]/ancestor::md-select";

    /**
     * Partial Selector for the drop down option
     * @type {String}
     */
    const aggregationLevelOption = "//md-option[div[contains(text(),'" + newAggregationLevelName + "')]]";

    //Select Aggregation Level
    await checkAvailability("null");
    await select2020DropDown(aggregationLevelDDSelector, aggregationLevelOption, newAggregationLevelName);
    await checkAvailability("null");
    await pause("5000");
};