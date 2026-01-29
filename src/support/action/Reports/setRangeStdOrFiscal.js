import setInputfield from '../setInputField';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';
import pause from '../pause';
import select2020DropDown from '../Common/select2020DropDown';

/**
 * Selects a range
 * @param  {String}   rangeOption              The value on the drop down
 * @param  {String}   xValue                   The X value
 * @param  {String}   typeOfCalendar           Chosen calendar
 */
export default async(rangeOption, xValue, typeOfCalendar) => {
    /**
     * Selector for the measure Name
     * @type {String}
     */
    const xValueInputFieldSelector = "//input[@name='pastXValue']";

    /**
     * Selector for the STANDARD drop down
     * @type {String}
     */
    const standardRangeDropDownSelector = "//md-select[@ng-change='tpCtrl.standardSelect.select()']";

    /**
     * Selector for the FISCAL drop down
     * @type {String}
     */
    const fiscalRangeDropDownSelector = "//md-select[@ng-change='tpCtrl.fiscalSelect.select()']";

    /**
     * Partial Selector for the STANDARD drop down option
     * @type {String}
     */
    const standardRangeOptionSelector = "//md-option[@data-ng-repeat='opt in tpCtrl.standardSelect.items'][.='" + rangeOption +"']";

    /**
     * Partial Selector for the FISCAL drop down option
     * @type {String}
     */
    const fiscalRangeOptionSelector = "//md-option[@data-ng-repeat='opt in tpCtrl.fiscalSelect.items'][.='" + rangeOption +"']";

    if (typeOfCalendar == 'Standard') {
        //Select Standard Values
        await select2020DropDown(standardRangeDropDownSelector, standardRangeOptionSelector, rangeOption);
        await pause(2000);
    }
    else {
        //Select Fiscal Values
        await select2020DropDown(fiscalRangeDropDownSelector, fiscalRangeOptionSelector, rangeOption);
        await pause(2000);
    }
    if (xValue != undefined) {
        //Set X value
        await waitForDisplayed(xValueInputFieldSelector);
        await checkIfElementExists(xValueInputFieldSelector);
        await setInputfield('set', xValue, xValueInputFieldSelector);
        await pause(1000);
    }
};