import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { longPause, smallPause } from '../../constants';
import pause from '../pause';
import select2020DropDown from '../Common/select2020DropDown';
import setInputfield from '../setInputField';

/**
 * Data Element to Click
 * @param  {String}   measureNameIndicator The dataElement column to choose
 */
    export default async(measureNameIndicator, filterType, value1, value2) => {
    /**
     * Selector for the dataElement column 
     * @type {String}
     */
    const dataElementMeasureSelector = "//th[@data-title='" +  measureNameIndicator + "']/a/span";

    /**
     * Selector for the column menu item
     * @type {String}
     */
    const advancedFilterMenuItemSelector = "//span[.='Advanced Filter']";

    /**
     * Selector for the drop down
     * @type {String}
     */
    const filterTypeDropdownSelector = "//md-select[@placeholder='Filter Type']";

    /**
     * Selector for the drop down option
     * @type {String}
     */
    const filterTypeDropdownOptionSelector = "//md-option[.='" + filterType +"']";

    /**
     * Selector for the top switch
     * @type {String}
     */
    const topSwitchSelector = "//md-switch[@ng-model='filterDialogCtrl.topControlsEnabled']";

    /**
     * Selector for the top switch
     * @type {String}
     */
    const topInputSelector = "//input[@ng-model='filterDialogCtrl.topValue']";

    /**
     * Selector for the bottom switch
     * @type {String}
     */
    const bottomSwitchSelector = "//md-switch[@ng-model='filterDialogCtrl.bottomControlsEnabled']";

    /**
     * Selector for the top switch
     * @type {String}
     */
    const bottomInputSelector = "//input[@ng-model='filterDialogCtrl.bottomValue']";

    /**
     * Selector for the top color picker arrow
     * @type {String}
     */
    const topColorPickerArrowSelector = "//div[@ng-show='filterDialogCtrl.topControlsEnabled']//span[@class='k-icon k-i-arrow-60-down']";

    /**
     * Selector for the bottom color picker arrow
     * @type {String}
     */
     const bottomColorPickerArrowSelector = "//div[@ng-show='filterDialogCtrl.bottomControlsEnabled']//span[@class='k-icon k-i-arrow-60-down']";

    /**
     * Selector for the top switch
     * @type {String}
     */
    const colorPickerSelector = "//div[@data-role='colorpicker'][@aria-hidden='false']/div[1]/div/div/input";

    /**
     * Selector for the apply button
     * @type {String}
     */
     const buttonTextSelector = "//div[@data-role='colorpicker'][@aria-hidden='false']//button[contains(.,'Apply')]";

    
    await waitForDisplayed(dataElementMeasureSelector);
    await waitFor(dataElementMeasureSelector,longPause, null, 'enabled');
    // console.log('before click on ...');
    await clickElement('click','element',dataElementMeasureSelector);
    await pause(smallPause);
    // console.log('advance filter click');
    await clickElement('click','element',advancedFilterMenuItemSelector);
    await pause(smallPause);
    await select2020DropDown(filterTypeDropdownSelector,filterTypeDropdownOptionSelector, filterType);
    await pause(smallPause);
    await clickElement('click','element',topSwitchSelector);
    if (filterType != 'Average' && value1 != undefined) {
        await clickElement('click','element',topInputSelector);
        await setInputfield('set',value1, topInputSelector);
    }
    await clickElement('click','element',bottomSwitchSelector);
    if (filterType != 'Average' && value2 != undefined) {
        await clickElement('click','element',bottomInputSelector);
        await setInputfield('set',value2, bottomInputSelector);
    }
    await pause(smallPause);
    await clickElement('click','element',topColorPickerArrowSelector);
    await pause(smallPause);
    // console.log('topcolorpicker');
    await clickElement('click','element',colorPickerSelector);
    await pause(smallPause);
    // console.log('open selection of color');
    await setInputfield('set', "#82d164", colorPickerSelector);
    await pause(smallPause);
    // console.log('setting color');
    await clickElement('click','button', buttonTextSelector);


    await pause(smallPause);
    await clickElement('click','element',bottomColorPickerArrowSelector);
    await pause(smallPause);
    await clickElement('click','element',colorPickerSelector);
    await pause(smallPause);
    await setInputfield('set', "#e62020", colorPickerSelector);
    await pause(smallPause);
    await clickElement('click','button', buttonTextSelector);
    await pause(smallPause);

}
