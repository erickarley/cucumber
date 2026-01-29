import setInputfield from '../setInputField';
import pause from '../pause';
import select2020DropDown from '../Common/select2020DropDown';
import setFilters from '../Common/setFilters';
import { smallPause } from '../../constants';
import clickElement from '../clickElement';

/**
 * Selects the filter settings on the value tab
 * @param  {String}   category          The drop down category
 * @param  {String}   fieldToSelect     The field to select
 * @param  {String}   startDate       The value to start
 * @param  {String}   endDate       The value to end
 */
export default async(category, fieldToSelect, startDate, endDate) => {
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
    const operatorDropDownOptionSelector = "//md-option[@data-ng-repeat='opt in dtDirCtrl.typeSelect.items'][.='Exact']";

    /**
     * Selector for the start date field
     * @type {String}
     */
    const startDateSelector = "//input[@id='start']";

    /**
     * Selector for the end date field
     * @type {String}
     */
    const endDateSelector = "//input[@id='end']";

    //filter Name
    await pause(1000);
    //Select Dimension
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
    await select2020DropDown(operatorDropDownSelector, operatorDropDownOptionSelector, 'Exact');
    await setInputfield('set', startDate, startDateSelector);
    await setInputfield('set', endDate, endDateSelector);
};