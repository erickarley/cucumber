import setInputfield from '../setInputField';
import pause from '../pause';
import select2020DropDown from '../Common/select2020DropDown';
import setFilters from '../Common/setFilters';
import clickElement from '../clickElement';
import { smallPause } from '../../constants';
import clickButton from '../Common/clickButton';

/**
 * Selects the filter settings on the value tab
 * @param  {String}   category          The drop down category
 * @param  {String}   fieldToSelect     The field to select
 * @param  {String}   valueToSelect     The field to select
 */
export default async(category, fieldToSelect, valueToSelect) => {
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
    const filterListItemSelector = "//div[@ng-repeat[contains(.,'dcItem in fdCtrl.filteredNouns')]]/span[.='" + fieldToSelect + "']";

    await clickElement("click", "selector", "//*[@class='addText']");

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
    const valueSelector = "//*[@class='predefinedValueItem']/span[text()='" + valueToSelect + "']";

    await clickElement('click','element',valueSelector);

    await clickButton("Save");
};