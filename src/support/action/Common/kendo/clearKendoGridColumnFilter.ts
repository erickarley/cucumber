import findColumnIndex from './findKendoGridColumnIndex';

export default async(columnHeader: string) => {
    const index = await findColumnIndex(columnHeader);

    const nthChild = index + 1;

    let selector = 'table[role="grid"] thead[role="rowgroup"] tr.k-filter-row th:nth-child(' + nthChild + ')';

    let filterHeader = await $(selector);
    let inputCell = await filterHeader.$('input');

    await inputCell.setValue('');
    await browser.keys('Tab'); // tab out of the field to apply
} 