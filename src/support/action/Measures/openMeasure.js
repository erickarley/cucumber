import clickElement from '../clickElement';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';

/**
 * Open the chosen report
 * @param  {String}   measureName      The name of the report to open
 */
export default async(measureName) => {
    /**
     * Selector for the queryIcon
     * @type {String}
     */
    const measureLink = "//*[@ng-bind='dataItem.Name'][contains(.,'" + measureName + "')]/ancestor::tr/td[1]/div/a";

    let sel = await $$(measureLink);
    await sel[0].click();
};