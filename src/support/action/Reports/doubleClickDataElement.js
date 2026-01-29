import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { bigPause, smallPause } from '../../constants';
import pause from '../pause';
import clearInputField from '../clearInputField';

/**
 * Data Element to Click
 * @param  {String}   actualElementName The dataElement to choose
 * @param  {String}   dataMeasureName The dataElement to choose
 */
export default async(dataElementName, dataMeasureName) => {
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
    const dataMeasureSelector = "//md-list-item//*[contains(.,'" + dataMeasureName + "')][1]";

    /**
     * Selector for the click button
     * @type {String}
     */
    const addAllButtonSelector = "#addAll";
    clearInputField(dataElementSearchSelector);
    /**
     * Const to receive input to search
     * @type {String}
     */
    const fieldToSelect = dataMeasureName;
    /**
     * Selector for the option of the filter to choose
     * @type {String}
     */
    const filterItemInList = dataMeasureSelector;
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
    /**
     * Selector for the dataElement
     * @type {String}
     */
    const dataElementMeasureSelector = "//span[@id[contains(.,'name-metric')]][.='" + dataElementName +"']";

    await waitForDisplayed(dataElementMeasureSelector);
    await waitFor(dataElementMeasureSelector, bigPause, null, 'enabled');
    await pause(1000);
    await clickElement('doubleClick','element',dataElementMeasureSelector);
    await pause(1000);
}