import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';

/**
 * hierarchy name to Click
 * @param  {String}   hierarchyElementName The hierarchy to choose
 */
    export default async(hierarchyElementName) => {
    /**
     * Selector for the hierarchy checkbox
     * @type {String}
     */
    const hierarchyElementCheckboxSelector = "//span[.='" + hierarchyElementName +"']/preceding-sibling::span[@class='k-checkbox-wrapper']";

    await waitForDisplayed(hierarchyElementCheckboxSelector);
    await clickElement('click','element',hierarchyElementCheckboxSelector);
}
