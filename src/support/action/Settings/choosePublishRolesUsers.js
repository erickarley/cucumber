import setFilters from '../Common/setFilters';
import select2020DropDown from '../Common/select2020DropDown';
import pause from '../pause';
import { mediumPause, smallPause } from '../../constants';
import clickElement from '../clickElement';

/**
 * Selects the settings for publish
 * @param  {String}   filtersToSelect     filters to select
 * @param  {String}   shareWithGroup      group to share
 */
export default async(filtersToSelect, shareWithGroup) => {
    /**Selector for the dimension
     * @type {String}
     */
    const groupSelector = "//md-select[@placeholder='All']";

    /**
     * Selector for the dimension option
     * @type {String}
     */
    const groupOptionSelector = "//md-option[.='" + shareWithGroup +"']";

    /**
     * Selector for the filter
     * @type {String}
     */
    const filterSelector = "//input[@ng-model='publishDialogController.searchBoxValue']";

    /**
     * Selector for the first item on the filter list
     * @type {String}
     */
    const firstItemOnFiltersList = "//md-list-item[@ng-repeat='item in publishDialogController.items | filter:publishDialogController.filter(publishDialogController.searchBoxValue)']/div/button/p";

    await pause(mediumPause);
    await select2020DropDown(groupSelector,groupOptionSelector,shareWithGroup);
    //await setFilters(filterSelector,firstItemOnFiltersList,filtersToSelect);
     /**
     * Selector for the option of the filter to choose
     * @type {String}
     */
    const filterItemInList = '//button/p[.="' +  filtersToSelect + '"]';
    await $(filterSelector).addValue(filtersToSelect);
    // console.log(filterItemInList);
    await pause(mediumPause);
    let listedFilter = await $(filterItemInList);
    // if ((await listedFilter.getText()).toUpperCase() == filtersToSelect.toUpperCase()) {
        //await waitForDisplayed(filterItemInList)
        await clickElement('click','button',filterItemInList);
        // await pause(smallPause);
    // }
    // else {
    //     let screenshotName = 'Error-Filter-' + filtersToSelect + '-NOT-EXISTS';
    //     screenshotName = screenshotName.replace(/\//g,'-');
    //     await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
    //     throw Error(screenshotName);
    // }
};
