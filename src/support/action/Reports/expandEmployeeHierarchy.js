import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';

/**
 * hierarchy name to Expand
 * @param  {String}   obsolete               Expand or collapse are the same
 * @param  {String}   hierarchyElementName   The hierarchy to choose
 */
    /* eslint-disable no-unused-vars */
    export default async(obsolete, hierarchyElementName) => {
    /* eslint-enable no-unused-vars */
    /**
     * Selector for the hierarchy name
     * @type {String}
     */
    const hierarchyElementArrowSelector = "//div[@is-store='false']//span[.='" + hierarchyElementName +"']/preceding-sibling::span[@class[contains(.,'k-icon')]]";

    await waitForDisplayed(hierarchyElementArrowSelector);
    await clickElement('click','element',hierarchyElementArrowSelector);
}
