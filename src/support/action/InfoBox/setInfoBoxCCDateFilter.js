import pause from '../pause';
import { mediumPause, smallPause } from '../../constants';
import clickElement from '../clickElement';


/**
 * Selects the filter settings on the value tab
 * @param  {String}   startDate       The date to start
 * @param  {String}   filterCriteria       The filter to use
 */
export default async(startDate, filterCriteria) => {
    /**
     * Selector for the calendar field
     * @type {String}
     */
    const transDateTimeSelector = "//input[@title='Transaction Date/Time']";

    /**
     * Selector for the drop down filter
     * @type {String}
     */
    const filterCriteriaSelector = "//th[2]//span[@title=''][@role='listbox']"
    // //th[2]//span[@class='k-icon k-i-filter']";

    /**
     * Selector for the option of the filter to choose
     * @type {String}
     */
     const criteriaOptionSelector = "//li[.='" + filterCriteria + "']";

    await $(transDateTimeSelector).addValue(startDate);
    await pause(mediumPause);
    console.log("Date entered: " + startDate);
    await clickElement('click','element',filterCriteriaSelector);
    await pause(mediumPause);
    // console.log("Clicked element");
    await clickElement('click','element',filterCriteriaSelector);
    await pause(mediumPause);
    // console.log("Clicked element");
    await clickElement('click','element',criteriaOptionSelector);
};