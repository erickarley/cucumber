import { bigPause, mediumPause } from '../../constants';
import dragElement from '../dragElement';
import pause from '../pause';

/**
 * Drags a column header into the grouping bar
 * @param  {String}   columnName      The name of the column
 */
export default async(columnName) => {
    /**
     * Selector for the field
     * @type {String}
     */
    const columnSelector = "//th/a[.='" + columnName +"']";
    
    await pause(mediumPause);
    await dragElement(columnSelector, "//div[@class='k-grouping-header']");
    await pause(bigPause);
};