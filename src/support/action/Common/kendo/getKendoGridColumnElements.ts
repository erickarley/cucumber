import { ElementArray } from 'webdriverio';

/**
 * Check the createdDay of the current browser window
  * @param  {number}     columnIndex The index of the column, 0 based
  * @param  {string|nunmber}     gridId Optional id of the grid, if more than one on page.
*/
export default async(columnIndex: number, gridId?: string|number) : Promise<ElementArray>=> {
    // nth-child starts at 1, so add  to index
    let selector = '.k-grid-content table tbody tr td:nth-child(' + (columnIndex+1) + ')';

    let elements = await $$(selector);

    return elements;
};
