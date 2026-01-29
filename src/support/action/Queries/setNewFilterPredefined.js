import setInputfield from '../setInputField';
import pause from '../pause';
import select2020DropDown from '../Common/select2020DropDown';
import setFilters from '../Common/setFilters';
import clickElement from '../clickElement';
import { bigPause, mediumPause, smallPause } from '../../constants';
import waitForDisplayed from '../waitForDisplayed';

/**
 * Selects the filter settings on the value tab
 * @param  {String}   category          The drop down category
 * @param  {String}   fieldToSelect     The field to select
 */
export default async(category, fieldToSelect) => {
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
    const operatorSelector = "//md-checkbox";

    /**
     * Selector for the option of the filter to choose
     * @type {String}
     */
    const filterItemInList = "//div[@ng-class='{query: !fdCtrl.isMeasure && !fdCtrl.isMonitor, measure: fdCtrl.isMeasure, monitor: fdCtrl.isMonitor, disabled: fdCtrl.changeValueOnly }']/div/span[.='" + fieldToSelect + "']";
    //filter Name
    await pause(1000);
    //Select Dimension
    await select2020DropDown(filterDropDownSelector, filterOptionSelector, category);
    await pause(2000);
    // await setFilters(filterSearchBox,filterListItemSelector,fieldToSelect)
    await $(filterSearchBox).addValue(fieldToSelect);
    await pause(mediumPause);
    let listedFilter = await $(filterListItemSelector);
    // const nameOfFilter = await listedFilter.getText(); 
    // console.log(listedFilter);
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
    // await browser.waitUntil(
    //     async () => (await setFilters(filterSearchBox,filterListItemSelector,fieldToSelect)),
    //     {
    //         timeout: bigPause,
    //         timeoutMsg: 'Element not visible'
    //     }
    // );
    // const predefinedOptions = await $$("//*[@class='predefinedValueItem']/span");
    // let isAvailable = false;
    // predefinedOptions.forEach(isOptionAvailable);

    // function isOptionAvailable(item, index, arr) {
    //     //console.log(arr[index].getText());
    //     if (arr[index].getText() == valueToSelect) {
    //         isAvailable = true;
    //     }
    // }

    // if (isAvailable == false) {
    //     let screenshotName = category + '-' + fieldToSelect + '-OPTION-' +valueToSelect + '-NOT-EXISTS'; 
    //     screenshotName = screenshotName.replace(/\//g,'-');
    //     await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
    //     throw Error(screenshotName);
    // }
    // else {
        await clickElement('click','element',operatorSelector);
    // };
};