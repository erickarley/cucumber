import pause from '../pause';
import select2020DropDown from '../Common/select2020DropDown';
import setFilters from '../Common/setFilters';
import { smallPause } from '../../constants';
import clickElement from '../clickElement';

/**
 * Selects a queryToMeasure
 * @param  {String}   displayCategory      The category to select
 * @param  {String}   displayFilters      The filters to select

 */
export default async(displayCategory, displayFilters) => {
    /**
     * Selector for the drop down
     * @type {String}
     */
    const queryToMeasureDropDownSelector = "//md-select[@placeholder='Choose Category']";

    /**
     * Partial Selector for the drop down option
     * @type {String}
     */
    const queryToMeasureOptionSelector = "//*[@data-ng-repeat[contains(.,'dc in dcCtrl.filterCategories')]][.='" + displayCategory +"']";

    /**
     * Selector for the Input Field
     * @type {String}
     */
    const queryToMeasureSearchBox = "#nounFilter";

    /**
     * Selector for the option of the filters area
     * @type {String}
     */
    const displayFiltersListItemSelector = "//div[@ng-click='dcCtrl.selectNoun(dcItem)']/span[.='" + displayFilters + "']";

    await pause(1000);
    //Select Category
    await select2020DropDown(queryToMeasureDropDownSelector, queryToMeasureOptionSelector, displayCategory);
    await pause(2000);
    //Select Filters
    //setFilters(queryToMeasureSearchBox,displayFiltersListItemSelector,displayFilters);
    /**
         * Selector for the option of the filter to choose
         * @type {String}
         */
     const filterItemInList = displayFiltersListItemSelector;
     await $(queryToMeasureSearchBox).addValue(displayFilters);
     await pause(smallPause);
     let listedFilter = await $(filterItemInList);
     if ((await listedFilter.getText()).toUpperCase() == displayFilters.toUpperCase()) {
         //await waitForDisplayed(filterItemInList)
         await clickElement('click','element',filterItemInList);
         await pause(smallPause);
     }
     else {
         let screenshotName = 'Error-Filter-' + displayFilters + '-NOT-EXISTS';
         screenshotName = screenshotName.replace(/\//g,'-');
         await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
         throw Error(screenshotName);
     } 
};