import clickElement from '../clickElement';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';
import pause from '../pause';
import select2020DropDownProp from './select2020DropDownProp';
import waitFor from '../waitFor';

/**
 * Properties for the widget
 * @param  {String}   calendarType        The type of calendar
 * @param  {String}   calendarRange       The range for the calendar
 * @param  {String}   iconAltName          Icon to select
 * @param  {String}   colorNumber         Color to select
 * @param  {String}   colorRow            Row of colors to select
 */
export default async(calendarType, calendarRange, iconAltName, colorNumber, colorRow) => {

    /**
     * Selector for the tab
     * @type {String}
     */
    const propertiesTab = "//md-tab-item[.='Properties']";
    
    /**
     * Selector for the icon
     * @type {String}
     */
    const iconToSelect = "//button[@alt='" + iconAltName + "']";

    /**
     * Selector for the color
     * @type {String}
     */
    const colorToSelect = "//table[@class]//tr[" + colorRow + "]/td[" + colorNumber + "]";

    let elementToFind = await $$(propertiesTab);

    if (elementToFind.length > 0) {
    //Actions of the step
        //Select Widgets Component
        await waitForDisplayed(propertiesTab);
        await checkIfElementExists(propertiesTab);
        await clickElement('click','element',propertiesTab);
        await pause(1000);
        //Select Calendar type
        await select2020DropDownProp(calendarType, calendarRange);
        await pause(1000);
        // Select the icon
        await waitForDisplayed(iconToSelect);
        await checkIfElementExists(iconToSelect);
        await clickElement('click','button',iconToSelect);    
        await pause(1000);
        // Select the color
        await waitForDisplayed(colorToSelect);
        await clickElement('click','element',colorToSelect);
    }
    else {
        let screenshotName = 'Properties-Widget-' + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};