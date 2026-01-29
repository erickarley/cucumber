import setInputfield from '../setInputField';
import pause from '../pause';
import select2020DropDown from '../Common/select2020DropDown';
import setFilters from '../Common/setFilters';
import clickElement from '../clickElement';
import { smallPause } from '../../constants';
import waitForDisplayed from 'webdriverio/build/commands/element/waitForDisplayed';

/**
 * Selects the filter settings on the value tab
 * @param  {String}   category          The drop down category
 * @param  {String}   fieldToSelect     The field to select
 * @param  {String}   operator       The operator to apply
 * @param  {String}   value       The value to enter
 */
export default async(category, fieldToSelect, operator, value) => {
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

    /**
     * Selector for the option of the filters area
     * @type {String}
     */
    const operatorSelector = "//md-tab-content[@class[contains(.,'md-active')]]//span[.='" + operator +"']";

    /**
     * Selector for the option of the filters area
     * @type {String}
     */
    const valueFieldSelector = "//*[@class='predefinedValueItem']/span[.='" + value + "']";

    //filter Name
    await pause(1000);
    //Select Dimension
    await select2020DropDown(filterDropDownSelector, filterOptionSelector, category);
    await pause(2000);
    /**
    * The number of elements found in the DOM
    * @type {Int}
    */
    const nrOfElements = await $$(filterListItemSelector);
    if (nrOfElements.length > 0) {
        // await setFilters(filterSearchBox,filterListItemSelector,fieldToSelect);
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
        await clickElement('click','element',operatorSelector);
        await clickElement('click','element',valueFieldSelector);    
    }
    else
    {
        let screenshotName = category + '-' + fieldToSelect + '-ERROR-FILTER-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
        // expect(nrOfElements).to.have.length.of.at.least(
        //     1,
        //     `Filter with name "${fieldToSelect}" should exist on the options for "${category}`
        // );
        //throw Error('Error: Filter ' + fieldToSelect + 'does not exist');
    }
};