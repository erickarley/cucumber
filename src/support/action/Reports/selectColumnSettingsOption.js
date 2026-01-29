import { mediumPause, smallPause } from '../../constants';
import clickElement from '../clickElement';
import pause from '../pause';
import waitForDisplayed from '../waitForDisplayed';

/**
 * hierarchy name to Click
 * @param  {String}   colSettingsOption The column setting to choose
 * @param  {String}   columnName        The name of the column
 */
    export default async(colSettingsOption, columnName) => {
    /**
     * Selector for the column name
     * @type {String}
     */
    const columnNameSelector = "//a[.='" + columnName + "']/preceding-sibling::a";

    /**
     * WARNING: THIS WILL ONLY WORK IF ONLY ONE COLUMNS SETTINGS HAS BEEN EXPANDED. 
     * WORKAROUND: REFRESH THE PAGE AND CLICK ON THE COLUMN SETTINGS FOR THE OTHER COLUMN. 
     * Selector for the column setting option
     * @type {String}
     */
    const columnSettingOption = "//span[.='" + colSettingsOption +"']";

    await waitForDisplayed(columnNameSelector);
    await clickElement('click','element',columnNameSelector);
    // await waitForDisplayed(columnSettingOption);
    await pause(smallPause);
    await clickElement('click','element',columnSettingOption);
}
