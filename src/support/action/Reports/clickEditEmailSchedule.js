import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';

/**
 * hierarchy name to Click
 * @param  {String}   labelForPeriod The hierarchy to choose
 */
    export default async(labelForPeriod) => {
    /**
     * Selector for the hierarchy checkbox
     * @type {String}
     */
    const periodEditButtonSelector = "//div[@class='scheduleLabel'][.='" + labelForPeriod +"']/following-sibling::button";

    await waitForDisplayed(periodEditButtonSelector);
    await clickElement('click','element',periodEditButtonSelector);
}
