import setInputfield from '../setInputField';
import clickElement from '../clickElement';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';
import pause from '../pause';
import select2020DropDown from './select2020DropDown';
import waitFor from '../waitFor';
import { bigPause } from '../../constants';

/**
 * Selects a widget
 * @param  {String}   widgetName          The name of the widget to select
 * @param  {String}   widgetSelected      The widget to select
 * @param  {String}   widgetCategory      The category of the widget to select
 * @param  {String}   widgetDimension     The dimension of the widget to select
 * @param  {String}   widgetDataElement   The data element of the widget to select
 */
export default async(widgetName, widgetSelected, widgetCategory, widgetDimension, widgetDataElement) => {
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
     * Selector for the Widget Category
     * @type {String}
     */
    const widgetCategoryItem = "//span[.='" + widgetCategory + "']/parent::button";

    /**
     * Selector for the Widget Item
     * @type {String}
     */
    const widgetItem = "//span[contains(.,'" + widgetSelected + "')]/parent::button";

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
        await pause(2000);
        //Select Data Element 
        await select2020DropDown('Data Element',widgetDataElement)
        // Search for the Category
        await waitForDisplayed(widgetSearchBox);
        await checkIfElementExists(widgetSearchBox);
        await setInputfield('set',widgetCategory,widgetSearchBox);
        await pause(1000);
        // Select from the widget left list - category
        await clickElement('click', 'element', widgetCategoryItem);
        await pause(1000);
        // Select from the widget right list - widgets available
        await clickElement('click', 'element', widgetItem);
    }
    else {
        let screenshotName = 'Widget-Component-' + widgetName + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};