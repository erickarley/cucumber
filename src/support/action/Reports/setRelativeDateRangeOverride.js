import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { longPause } from '../../constants';
import pause from '../pause';
import select2020DropDown from '../Common/select2020DropDown';
import setInputfield from '../setInputField';

/**
 * Data Element to Click
 * @param  {String}   measureNameIndicator The dataElement column to choose
 */
export default async(dateType, calendarType, range) => {
    /**
     * Selector for the drop down
     * @type {String}
     */
    const filterTypeDropdownSelector = "//md-select[@placeholder='Type']";

    /**
     * Selector for the drop down option
     * @type {String}
     */
    const filterTypeDropdownOptionSelector = "//md-option[@data-ng-repeat='opt in dateRangeSelector.timeTypeOptions'][.='" + dateType +"']";

    /**
     * Selector for the drop down
     * @type {String}
     */
    const calendarTypeDropdownSelector = "//md-select[@placeholder='Calendar']";

    /**
      * Selector for the drop down option
      * @type {String}
      */
    const calendarTypeDropdownOptionSelector = "//md-option[@data-ng-repeat='opt in dateRangeSelector.calendarTypeOptions'][.='" + calendarType +"']";

    /**
     * Selector for the drop down
     * @type {String}
     */
    const rangeDropdownSelector = "//md-select[@placeholder='Range']";

    /**
     * Selector for the drop down option
     * @type {String}
     */
    const rangeDropdownOptionSelector = "//md-option[@data-ng-repeat='opt in dateRangeSelector.relativeStandardDateRangeOptions track by opt.id'][.='" + range +"']";
 
    
    await waitForDisplayed(filterTypeDropdownSelector);
    await waitFor(filterTypeDropdownSelector,longPause, null, 'enabled');
    await select2020DropDown(filterTypeDropdownSelector,filterTypeDropdownOptionSelector, dateType);
    await pause(1000);
    await select2020DropDown(calendarTypeDropdownSelector,calendarTypeDropdownOptionSelector, calendarType);
    await pause(1000);
    await select2020DropDown(rangeDropdownSelector,rangeDropdownOptionSelector, range);
    await pause(1000);
}
