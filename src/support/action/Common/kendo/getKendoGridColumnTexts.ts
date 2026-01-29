import getColumnElements from './getKendoGridColumnElements'

/**
 * Check the createdDay of the current browser window
  * @param  {number}     columnIndex The index of the column, 0 based
  * @param  {string|nunmber}     gridId Optional id of the grid, if more than one on page.
*/
export default async(columnIndex: number, gridId?: string|number) : Promise<Array<string>>=> {
    // nth-child starts at 1, so add  to index
    let elements = await getColumnElements(columnIndex, gridId);

    let textValues = new Array<string>();

    for (const element of elements) {
       textValues.push(await element.getText());
    }

    return textValues;
};
