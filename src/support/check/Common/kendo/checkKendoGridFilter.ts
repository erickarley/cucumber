import findKendoGridColumnIndex from '../../../../support/action/Common/kendo/findKendoGridColumnIndex'
import getColumnTexts from  '../../../../support/action/Common/kendo/getKendoGridColumnTexts'
/**
 * Check the createdDay of the current browser window
  * @param  {string}     order The expected order
 * @param  {string}     columnHeader The fieldName of the column
*/
export default async(columnHeader: string) => {

    const index = await findKendoGridColumnIndex(columnHeader);
    const nthChild = index + 1;

    const values = await getColumnTexts(index);

    expect(values.length).toBeGreaterThan(0);

    const selector = 'table[role="grid"] thead[role="rowgroup"] tr.k-filter-row th:nth-child(' + nthChild + ')';

    const filterHeader = await $(selector);
    const inputCell = await filterHeader.$('input')

    const  filterValue =  (await inputCell.getValue()).toLocaleLowerCase();


    for (const value in values.values) {
        const i = value.toLocaleLowerCase().indexOf(filterValue);
        expect(i).toBeGreaterThan(-1);
    }

};
