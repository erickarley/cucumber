import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';

/**
 * aggregation name to Click
 * @param  {String}   aggregationLevelName The aggregation to choose
 */
    export default async(aggregationLevelName) => {
    /**
     * Selector for the aggregation checkbox
     * @type {String}
     */
    const aggregationItemSelector = "//button/span[.='" + aggregationLevelName +"']";

    await waitForDisplayed(aggregationItemSelector);
    await clickElement('click','element',aggregationItemSelector);
}
