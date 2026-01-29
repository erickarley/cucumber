import findColumnIndex from './findKendoGridColumnIndex';

export default async(filter: string, columnHeader: string, gridId? :string) => {
    const index = await findColumnIndex(columnHeader);
    const nthChild = index + 1;

    gridId = !!gridId ? '#' + gridId : "";
    const selector = gridId + " " + 'table[role="grid"] thead[role="rowgroup"] tr.k-filter-row th:nth-child(' + nthChild + ')';

    const filterHeader = await $(selector);
    const inputCell = await filterHeader.$('input')

    const filterTypeSelector = await filterHeader.$('span.k-dropdown.k-dropdown-operator')

    await filterTypeSelector.click();

    const filterOptions = await $$('div.k-list-scroller ul.k-list li.k-item');

    let childIndex = 1;
    for (const option of filterOptions) {
        const optiontext = await option.getText();

        if (optiontext === 'Contains') {
          //  await option.click();
            break;
        }
        childIndex ++;
    }

    let s = 'div.k-list-scroller ul.k-list li.k-item:nth-child(' + childIndex + ')';

    const result = await browser.execute((s) => {
        // browser context - you may not access client or console
 
        console.error(s);
        return $(s).click();
    }, s);

    await inputCell.setValue(filter);
    await browser.keys('Tab'); // tab out of the field to apply
}
