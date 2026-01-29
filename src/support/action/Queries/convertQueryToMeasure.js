import setInputfield from '../setInputField';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';
import pause from '../pause';
import select2020DropDown from '../Common/select2020DropDown';
import setFilters from '../Common/setFilters';
import { smallPause } from '../../constants';
import clickElement from '../clickElement';

/**
 * Selects a queryToMeasure
 * @param  {String}   queryToMeasureName          The name of the queryToMeasure to select
 * @param  {String}   queryToMeasureDimension     The Dimension to Select
 * @param  {String}   queryToMeasureFilters       The filters to select

 */
export default async(queryToMeasureName, queryToMeasureDimension, queryToMeasureFilters) => {
    /**
     * Selector for the measure Name
     * @type {String}
     */
    const queryToMeasureInput = "//input[@name='measureName']";

    /**
     * Selector for the drop down
     * @type {String}
     */
    const queryToMeasureDropDownSelector = "//*[@class='labelHeader'][.='Dimensions']/parent::div/md-select";

    /**
     * Partial Selector for the drop down option
     * @type {String}
     */
    const queryToMeasureOptionSelector = "//*[@ng-repeat='item in ctCtrl.measureService.dimensions'][.='" + queryToMeasureDimension +"']";

    /**
     * Selector for the Input Field
     * @type {String}
     */
    const queryToMeasureSearchBox = "//input[@ng-model='ctCtrl.nounFilterString']";

    /**
     * Selector for the option of the filters area
     * @type {String}
     */
    const queryToMeasureFiltersListItemSelector = "//div[@ng-click='ctCtrl.measureService.selectSummaryColumn(col)'][1]";


    //queryToMeasure Name
    await waitForDisplayed(queryToMeasureInput);
    await checkIfElementExists(queryToMeasureInput);
    await setInputfield('set',queryToMeasureName,queryToMeasureInput);
    await pause(1000);
    //Select Dimension
    if (queryToMeasureDimension != null) {
        await select2020DropDown(queryToMeasureDropDownSelector, queryToMeasureOptionSelector, queryToMeasureDimension);
    }   
    await pause(2000);
    // await setFilters(queryToMeasureSearchBox,queryToMeasureFiltersListItemSelector,queryToMeasureFilters)
    // /**
    //  * Selector for the option of the filter to choose
    //  * @type {String}
    //  */
    // const filterItemInList =

    await $(queryToMeasureSearchBox).addValue(queryToMeasureFilters);
    await pause(smallPause);
    let listedFilter = await $(queryToMeasureFiltersListItemSelector);
    if ((await listedFilter.getText()).toUpperCase() == queryToMeasureFilters.toUpperCase()) {
        await waitForDisplayed(queryToMeasureFiltersListItemSelector)
        await clickElement('click','element',queryToMeasureFiltersListItemSelector);
        await pause(smallPause);
    }
    else {
        let screenshotName = 'Error-Filter-' + queryToMeasureFilters + '-NOT-EXISTS';
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};