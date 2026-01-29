import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { bigPause, smallPause } from '../../constants';
import pause from '../pause';
import clickButton from '../Common/clickButton';
import setFilters from '../Common/setFilters';
import clearInputField from '../clearInputField';

/**
 * Data Element to Add
 * @param  {String}   dataElementName The dataElement to choose
 */
export default async(dataElementName) => {

    /**
     * Selector for the dataElement searchbox
     * @type {String}
     */
    const dataElementSearchSelector = "//div[@ng-show='!dataElementController.showCreateReportKpiButton()']//input[@ng-model='dataElementController.search']";

    // /**
    //  * Selector for the dataElement
    //  * @type {String}
    //  */
    // const dataElementMeasureSelector = "//div[@id='dataElements']//md-list-item//button[@title='" + dataElementName +"']";
    
    /**
     * Selector for the dataElement
     * @type {String}
     */
    const dataElementMeasureSelector = "//md-list-item//*[contains(.,'" + dataElementName + "')][1]";

    /**
     * Selector for the click button
     * @type {String}
     */
    const addAllButtonSelector = "#addAll";
    clearInputField(dataElementSearchSelector);

    //await setFilters(dataElementSearchSelector,dataElementMeasureSelector, dataElementName);
    /**
     * Const to receive input to search
     * @type {String}
     */
     const fieldToSelect = dataElementName;
     /**
     * Selector for the option of the filter to choose
     * @type {String}
     */
    const filterItemInList = dataElementMeasureSelector;
    await $(dataElementSearchSelector).addValue(fieldToSelect);
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
    await pause(smallPause);
    await clickElement('click','button',addAllButtonSelector);
    await pause(smallPause);
}
