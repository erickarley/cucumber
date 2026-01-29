import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';
import clickElement from '../clickElement';
import pause from '../pause';

/**
 * Look for the option to select
 * @param  {String}   calendarValue      The name of the option to select
 * @param  {String}   rangeValue         The name of the range to select
 */
export default async(calendarValue, rangeValue) => {
    /**
     * Selector for the Calendar Dropdown
     * @type {String}
     */
    const calendarDropDowntoOpen = "//*[@class='datePickerControlWrapper']/label[.='Calendar']/following-sibling::div/md-select";

    /**
     * Selector for the Calendar value
     * @type {String}
     */
    const calendarValueToSelect = "//*[@data-ng-repeat='opt in datePickerController.calendarSelect.items'][.='" + calendarValue + "']";

    /**
     * Selector for the Calendar Dropdown
     * @type {String}
     */
    const rangeDropDowntoOpen = "//*[@class='datePickerControlWrapper']/label[.='Range']/following-sibling::div/md-select";

    /**
    * The text of the calendar
    * @type {String}
    */
    let calendarType = '';
    
    if (calendarValue === 'Standard') {
        calendarType = 'standard';
    }
    else {
        calendarType = 'fiscal';
    }
    /**
     * Selector for the option on the Range dropdown
     * @type {String}
     */
    const rangeOptiontoSelect = "//*[@data-ng-repeat='opt in datePickerController." + calendarType + "Select.items'][.='"+ rangeValue +"']";

    let elementToFind = await $$(calendarDropDowntoOpen);

    if (elementToFind.length > 0) {
        //Value for the Calendar
        await waitForDisplayed(calendarDropDowntoOpen);
        await checkIfElementExists(calendarDropDowntoOpen);
        await clickElement('click','element',calendarDropDowntoOpen);
        await pause(1000);
        await waitForDisplayed(calendarValueToSelect);
        await checkIfElementExists(calendarValueToSelect);
        await clickElement('click','element',calendarValueToSelect);
        await pause(1000);
        // Value for the Range
        await waitForDisplayed(rangeDropDowntoOpen);
        await checkIfElementExists(rangeDropDowntoOpen);
        await clickElement('click','element',rangeDropDowntoOpen);
        await pause(1000);
        await waitForDisplayed(rangeOptiontoSelect);
        await checkIfElementExists(rangeOptiontoSelect);
        await clickElement('click','element',rangeOptiontoSelect);
    }
    else {
        let screenshotName = 'Calendar-DropDown-' + calendarType + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};