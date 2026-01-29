import setInputfield from '../setInputField';
import pause from '../pause';
import select2020DropDown from '../Common/select2020DropDown';
import setFilters from '../Common/setFilters';
import clickElement from '../clickElement';
import clickTab from '../Common/clickTab';
import { smallPause } from '../../constants';
/**
 * Selects the filter settings on the value tab
 * @param  {String}   category          The drop down category
 * @param  {String}   filterToSelect    The field to select
 * @param  {String}   operator          The operator to apply
 * @param  {String}   secondCategory    The second category drop down value
 * @param  {String}   filterToCompare   The value to enter
 */
export default async(filterToSelect, category, filterToCompare, secondCategory, operator) => {
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
    const filterListItemSelector = "//div[@ng-repeat[contains(.,'dcItem in fdCtrl.filteredNouns')]]/span[.='" + filterToSelect + "']";

    /**
     * Selector for the option of the filters area
     * @type {String}
     */
    const operatorSelector = "//ag-operators[@operators='value.comparisonOperators']//span[.='" + operator +"']";

    /**
     * Selector for the drop down
     * @type {String}
     */
    const secondCategorySelector = "#ComparisonCategoryDropDown";

    /**
     * Partial Selector for the drop down option
     * @type {String}
     */
    const secondCategoryOptionSelector = "//md-option[@data-ng-repeat='dc in value.categoryDropdownState.items'][.='" + secondCategory +"']";

    /**
     * Selector for the second filter input
     * @type {String}
     */
    const secondFilterInputBox = "#nounComparisonFilter";
    
    /**
     * Selector for the option of the filters area
     * @type {String}
     */
    const filterToCompareSelector = "//div[@class[contains(.,'nounComparisonContainer')]]//span[.='" + filterToCompare + "']";

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
        // await setFilters(filterSearchBox,filterListItemSelector,filterToSelect);
        /**
         * Const to receive input to search
         * @type {String}
         */
        let fieldToSelect = filterToSelect;
        /**
         * Selector for the option of the filter to choose
         * @type {String}
         */
        const filterItemInList = filterListItemSelector;
        await $(filterSearchBox).setValue("");
        await $(filterSearchBox).setValue(fieldToSelect);
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
        await pause(1000);
        await clickTab('Compare');
        await pause(1000);
        await clickElement('click','element',operatorSelector);
        await pause(1000);
        //Select Dimension
        await select2020DropDown(secondCategorySelector, secondCategoryOptionSelector, secondCategory);
        await pause(2000);
        //await setFilters(secondFilterInputBox,filterToCompareSelector,filterToCompare);
        /**
         * Const to receive input to search
         * @type {String}
         */
        fieldToSelect = filterToCompare;
        /**
         * Selector for the option of the filter to choose
         * @type {String}
         */
        const filterItemInList2 = filterToCompareSelector;
        await $(filterSearchBox).setValue("");
        await $(secondFilterInputBox).setValue(fieldToSelect);
        await pause(smallPause);
        listedFilter = await $(filterToCompareSelector);
        if ((await listedFilter.getText()).toUpperCase() == fieldToSelect.toUpperCase()) {
            //await waitForDisplayed(filterItemInList)
            await clickElement('click','element',filterToCompareSelector);
            await pause(smallPause);
        }
        else {
            let screenshotName = 'Error-Filter-' + fieldToSelect + '-NOT-EXISTS';
            screenshotName = screenshotName.replace(/\//g,'-');
            await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
            throw Error(screenshotName);
        }  
    }
    else
    {
        let screenshotName = category + '-' + filterToSelect + '-ERROR-FILTER-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
        // expect(nrOfElements).to.have.length.of.at.least(
        //     1,
        //     `Filter with name "${filterToSelect}" should exist on the options for "${category}`
        // );
        //throw Error('Error: Filter ' + filterToSelect + 'does not exist');
    }
};