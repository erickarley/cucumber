import findKendoGridColumnIndex from '../../../action/Common/kendo/findKendoGridColumnIndex'
import getColumnElements from '../../../action/Common/kendo/getKendoGridColumnElements'
/**
 * Check the createdDay of the current browser window
  * @param  {string}     order The expected order
 * @param  {string}     columnHeader The fieldName of the column
*/
export default async(order: 'ascending'|'descending', columnHeader: string) => {

    let index = await findKendoGridColumnIndex(columnHeader);
    let elements = await getColumnElements(index);

    expect(elements.length > 1).toBeTruthy();

    let dateValues = new Array<Date>();

    for (const element of elements) {
        let t = await element.getText();
        dateValues.push(new Date(t));
    }

    if (order == 'descending') {
        dateValues = dateValues.reverse();
    }

    for (let i = 1; i < dateValues.length; i++)
    {
        expect(dateValues[i - 1] <= dateValues[i]).toBeTruthy();
    }
};

