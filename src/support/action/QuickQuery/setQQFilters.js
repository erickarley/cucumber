import clickElement from '../clickElement';
import setInputField from '../setInputField';
import pause from '../pause';
import waitForDisplayed from '../../action/waitForDisplayed';
import { bigPause, mediumPause, smallPause } from '../../constants';
import checkAvailability from '../../check/Common/checkAvailability';
import checkOverlay from '../../check/Common/checkOverlay';
import checkLoadingOverlay from '../../check/Common/checkLoadingOverlay';

/**
 * Selects a Filter
 * @param  {String}   filterNames           List of filters
 */

export default async (filterNames) => {
    /**
     * Selector for the filter field
     * @type {String}
     */
    const filterSearchSelector = "//*[@placeholder='Filter ... ']";

    /**
     * Selector for the filterNames
     * @type {String}
     */
    const filterNamesSelector = "//*[@placeholder='Choose Category']";

    /**
     * Selector for the filterNames option
     * @type {String}
     */
    const filterNamesOptionSelector = "//*[@class[contains(.,'nounListItem')]][1]/span";

    if (filterNames != null) {
        console.log(filterNames);
        //Search the filters
        let arrayFilters = filterNames.split(',');

        for (let i = 0; i < arrayFilters.length; i++) {
            await pause(mediumPause);
            console.log(arrayFilters[i]);
            await setInputField('set', arrayFilters[i], filterSearchSelector);
            await pause(bigPause);
            await checkOverlay();
            await checkLoadingOverlay();
            await checkAvailability();
            //waitForDisplayed(filterNamesOptionSelector)
            await clickElement('click','element',filterNamesOptionSelector);
            await pause(mediumPause);
            await setInputField('set', '', filterSearchSelector);
        }

        await pause(smallPause);
        await checkLoadingOverlay();
    }
    
};