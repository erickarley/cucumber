import { bigPause, mediumPause } from '../../constants';
import dragElement from '../dragElement';
import pause from '../pause';
import setInputfield from '../setInputField';
import waitFor from '../waitFor';
import waitForDisplayed from '../waitForDisplayed';

/**
 * Performs the name of the filter
 * @param  {String}   filterName      The name of the filter
 */
export default async(filterName) => {
    /**
     * Selector for the field
     * @type {String}
     */
    const fieldSelector = "#grouping-tab-noun-filter";
    
    await waitForDisplayed(fieldSelector);
    await waitFor(fieldSelector, bigPause, null, 'enabled');
    await setInputfield('set', filterName, fieldSelector);
    await pause(mediumPause);
    await dragElement("//div[@class='noun'][1]", "//label[contains(.,'GROUP')]/following-sibling::div[@class='removable-noun-list']");
    await pause(bigPause);

};