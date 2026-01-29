import setInputfield from '../setInputField';
import clickElement from '../clickElement';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';
import pause from '../pause';
import select2020DropDown from './select2020DropDown';
import waitFor from '../waitFor';
import { bigPause, mediumPause } from '../../constants';

/**
 * Selects a widget
 * @param  {String}   widgetName          The name of the widget to select
 * @param  {String}   widgetDimension     The dimension of the widget to select
 * @param  {String}   kpiName      The KPI of the widget to select
 */
export default async(widgetName, widgetDimension, kpiName) => {
    /**
     * Selector for the widgetName
     * @type {String}
     */
    const widgetsComponentOption = "//h3[.='Widgets']";

    /**
     * Selector for the widgetName
     * @type {String}
     */
    const widgetInput = "//input[@class[contains(.,'dashboardWidgetName')]]";

    /**
     * Selector for the Input Field
     * @type {String}
     */
    const widgetSearchBox = "//input[@ng-model='itemListWithSearchController.searchBoxValue']";

    /**
     * Selector for the Widget KPI
     * @type {String}
     */
    const widgetKPIItem = "//span[.='" + kpiName + "']/parent::button";

    let elementToFind = await $$(widgetsComponentOption);

    if (elementToFind.length > 0) {
        //Actions of the step
        //Select Widgets Component
        await waitForDisplayed(widgetsComponentOption);
        await waitFor(widgetsComponentOption,bigPause,null,'enabled');
        await clickElement('click','element',widgetsComponentOption);
        //Widget Name
        await waitForDisplayed(widgetInput);
        await waitFor(widgetInput,bigPause,null,'enabled');
        await setInputfield('set',widgetName,widgetInput);
        await pause(1000);
        //Select Dimension
        await select2020DropDown('Dimension',widgetDimension);
        await pause(mediumPause);
        //Select Data Element 
        await select2020DropDown('Data Element','KPIs - Master')
        // Search for the KPI
        await waitForDisplayed(widgetSearchBox);
        await checkIfElementExists(widgetSearchBox);
        await setInputfield('set',kpiName,widgetSearchBox);
        await pause(1000);
        // Select from the widget left list - KPI
        await clickElement('click', 'element', widgetKPIItem);
        await pause(1000);
    }
    else {
        let screenshotName = 'Widget-Component-' + widgetName + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};