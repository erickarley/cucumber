/**
 * Check for a Header in the table
 * @param  {String}     keyName     The name of the stored key
 * @param  {String}     falseCase   The false or true check
 * @param  {String}     tableRow2   The false or true check
 * @param  {String}     tableCell2   The false or true check
 */
export default async(keyName, falseCase, tableRow2, tableCell2) => {
    let keyValue1 = browser.sharedStore.get(keyName);
    /**
     * Selector for the table cell 2
     * @type {String}
     */
    const tableCellValue2 = await $("//table[@role='grid']//tr[" + tableRow2 + "]/td[" + tableCell2 +"]").getText();

    if (falseCase) {
        expect(parseInt(keyValue1,10)).to.not
            .equal(
                parseInt(tableCellValue2, 10),
                `Expected value on row await ${tableRow2}, cell await ${tableCell2} not to be "${keyValue1}"`
            );
    } else {
        expect(parseInt(keyValue1,10)).to
            .equal(
                parseInt(tableCellValue2, 10),
                `Expected value on row await ${tableRow2}, cell await ${tableCell2} to be "${keyValue1}"`
            );
    }
};
