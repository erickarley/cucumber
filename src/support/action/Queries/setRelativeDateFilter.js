import setInputfield from '../setInputField';
import pause from '../pause';
import select2020DropDown from '../Common/select2020DropDown';
import setFilters from '../Common/setFilters';
import waitForDisplayed from '../waitForDisplayed';
import clickElement from '../clickElement';
import { smallPause } from '../../constants';


/**
 * Selects the filter settings on the value tab
 * @param  {String}   category          The drop down category
 * @param  {String}   fieldToSelect     The field to select
 * @param  {String}   typeOfCalendar       The type of Calendar
 * @param  {String}   rangeOption       The rangeOption
 */
export default async(category, fieldToSelect, typeOfCalendar, rangeOption, xValue) => {
    /**
     * Selector for the drop down
     * @type {String}
     */
    const filterDropDownSelector = "//div[@class='dataCategorySection']//md-select[@placeholder='Category']";
    /**
     * Partial Selector for the drop down option
     * @type {String}
     */
    const filterOptionSelector = "//md-option[@data-ng-repeat='dc in fdCtrl.categoryDropdownState.items'][.='" + category +"']";

    /**
     * Selector for the Input Field
     * @type {String}
     */
    const filterSearchBox = "//div[@class='dataCategorySection']/input[@id='nounFilter']";

    /**
     * Selector for the option of the filters area
     * @type {String}
     */
    const filterListItemSelector = "//div[@ng-repeat[contains(.,'dcItem in fdCtrl.filteredNouns')]]/span[1]";

    /**
     * Selector for the option of the type of date
     * @type {String}
     */
    const operatorDropDownSelector = "//md-select[@placeholder='Type']";

    /**
     * Selector for the option of the type of date
     * @type {String}
     */
    const operatorDropDownOptionSelector = "//md-option[@data-ng-repeat='opt in dtDirCtrl.typeSelect.items'][.='Relative']";

        /**
     * Selector for the measure Name
     * @type {String}
     */
    const xValueInputFieldSelector = "//input[@ng-model='dtDirCtrl.filter.dateFilterValue.slidingRange.xValue']";

    /**
     * Selector for the Calendar drop down
     * @type {String}
     */
    const calendarDropDownSelector = "//md-select[@placeholder='Calendar']";

    /**
     * Selector for the Calendar option
     * @type {String}
     */
    const calendarDropDownOptionSelector = "//md-option[@data-ng-repeat='opt in dtDirCtrl.calendarSelect.items'][.='" + typeOfCalendar +"']";


    /**
     * Selector for the STANDARD drop down
     * @type {String}
     */
    const RangeDropDownSelector = "//md-select[@placeholder='Range']";

    /**
     * Partial Selector for the STANDARD drop down option
     * @type {String}
     */
    const standardRangeOptionSelector = "//md-option[@data-ng-repeat='opt in dtDirCtrl.standardSelect.items track by opt.Value'][.='" + rangeOption +"']";

    /**
     * Partial Selector for the FISCAL drop down option
     * @type {String}
     */
    const fiscalRangeOptionSelector = "//md-option[@data-ng-repeat='opt in dtDirCtrl.fiscalSelect.items track by opt.Value'][.='" + rangeOption +"']";


    //filter Name
    await pause(1000);
    //Select Category
    await select2020DropDown(filterDropDownSelector, filterOptionSelector, category);
    await pause(2000);
    //await setFilters(filterSearchBox,filterListItemSelector,fieldToSelect);
    
     /**
     * Selector for the option of the filter to choose
     * @type {String}
     */
    const filterItemInList = filterListItemSelector;
    await $(filterSearchBox).addValue(fieldToSelect);
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
    await select2020DropDown(operatorDropDownSelector, operatorDropDownOptionSelector, 'Relative');

    await select2020DropDown(calendarDropDownSelector, calendarDropDownOptionSelector, typeOfCalendar);

    if (typeOfCalendar == 'Standard') {
        //Select Standard Values
        await select2020DropDown(RangeDropDownSelector, standardRangeOptionSelector, rangeOption);
        await pause(2000);
    }
    else {
        //Select Fiscal Values
        await select2020DropDown(RangeDropDownSelector, fiscalRangeOptionSelector, rangeOption);
        await pause(2000);
    }
    if (xValue != undefined) {
        //Set X value
        await waitForDisplayed(xValueInputFieldSelector);
        await setInputfield('set', xValue, xValueInputFieldSelector);
        await pause(1000);
    }
};