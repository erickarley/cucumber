import pause from '../pause';
import clickElement from '../clickElement';
import setInputfield from '../setInputField';
import { smallPause } from '../../constants';

/**
 * Selects the settings for summation
 * @param  {String}   measureName          Name config
 * @param  {String}   summaryValue          Type selection
 * @param  {String}   improvementType           improvementType selection
 */
export default async(measureName, summaryValue, improvementType) => {
    /**Selector for the name
     * @type {String}
     */
    const addDataElementButtonSelector = "//button[contains(.,'Add Data Element')]";

    /**
     * Selector for the filter
     * @type {String}
     */
    const filterSelector = "//input[@type='text'][@ng-model='ctrl.search']";

    /**Selector for the improvementType
     * @type {String}
     */
    const dataElementSelector = "//md-list-item[@scroll-to-note-id-container='dataElements'][1]";

    /**
      * Selector for the improvementType option
      * @type {String}
      */
    const switchToIncludeSummarySelector = "//td[.='" + summaryValue + "']/following::td[1]/md-switch";

    /**
      * Selector for the improvementType option
      * @type {String}
      */
    const typeOfSummarySelector = "//td[.='" + summaryValue + "']/following::td[2]//span[.='" + improvementType + "']";

    await clickElement('click','element',addDataElementButtonSelector);
    await pause(smallPause);
    await setInputfield('set',measureName,filterSelector);
    await pause(1000);
    await clickElement('click','element',dataElementSelector);
    await pause(1000);
    await clickElement('click','element',switchToIncludeSummarySelector);
    await pause(1000);
    await clickElement('click','element',typeOfSummarySelector);
    await pause(1000);
    await clickElement('click','element',"//button/span[.='Add']");
    await pause(1000);
}
