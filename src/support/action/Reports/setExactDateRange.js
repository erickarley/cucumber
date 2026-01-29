import setInputfield from '../setInputField';
import pause from '../pause';
import waitFor from '../waitFor';
import pressButton from '../pressButton';
import { hugePause, mediumPause } from '../../constants';
import waitForDisplayed from '../waitForDisplayed';
import select2020DropDown from '../Common/select2020DropDown';

/**
 * Selects the filter settings on the value tab
 * @param  {String}   startDate       The value to start
 * @param  {String}   endDate       The value to end
 */
export default async(startDate, endDate) => {
    
    /**
     * Selector for the Report type drop down
     * @type {String}
     */
    const timeTypeDDSelector = "//label[.='Type']/following-sibling::md-select";
    
    /**
     * Partial Selector for the drop down option
     * @type {String}
     */
    const timeTypeOptionSelector = "//md-option[@data-ng-repeat='opt in tpCtrl.typeSelect'][.='Exact']";

    /**
     * Selector for the start date field
     * @type {String}
     */
    const startDateSelector = "//input[@kendo-date-picker='fromCustomDateOption']";

    /**
     * Selector for the end date field
     * @type {String}
     */
    const endDateSelector = "//input[@kendo-date-picker='toCustomDateOption']";
    await select2020DropDown(timeTypeDDSelector, timeTypeOptionSelector, 'Exact');
    /**
     * The Overlay selector
     * @type {String}
     */
    const loadingGifSelector = "//img[@src[contains(.,'loading-image.gif')]]";
    await waitFor(loadingGifSelector,hugePause,true,'exist');
    await pause(mediumPause);
    
    var i;
    await setInputfield('add', '1', startDateSelector);
    for (i = 0; i < 11; i++) {
        await pressButton('Backspace');
    }

    await setInputfield('set', startDate, startDateSelector);
    await pressButton('Enter');
    /**
    * The Banner name selector
    * @type {String}
    */
    const BannerNameSelector = "//span[contains(.,'Your result set has been truncated.')]";
    
    await waitForDisplayed(BannerNameSelector,'not');
    
    await waitFor(loadingGifSelector,hugePause,true,'exist');
    await pause(mediumPause);
    await setInputfield('add', '1', endDateSelector);
    var i;
    for (i = 0; i < 11; i++) {
        await pressButton('Backspace');
    }
    await setInputfield('set', endDate, endDateSelector);
    await pressButton('Enter');
};