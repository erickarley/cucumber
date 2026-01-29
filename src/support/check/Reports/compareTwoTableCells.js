import checkAvailability from '../Common/checkAvailability';
/**
 * Check for a Header in the table
 * @param  {String}     headerType     The Header type to check
 * @param  {String}     expectedHeader The expected Header text
 */
export default async(tableRow1, tableCell1, falseCase, tableRow2, tableCell2) => {
    
    // await checkLoadingOverlay(true);
    // await checkOverlay(true);
    // await waitLoadingGif(true);
    await checkAvailability();

    /**
     * Selector for the table cell 1
     * @type {String}
     */
    const tableCellValue1Selector = "//table[@role='grid']//tr[" + tableRow1 + "]/td[" + tableCell1 +"]";
    let elementToFind1 = await $$(tableCellValue1Selector);

/**
     * Selector for the table cell 1
     * @type {String}
     */
    const tableCellValue2Selector = "//table[@role='grid']//tr[" + tableRow2 + "]/td[" + tableCell2 +"]";
    let elementToFind2 = await $$(tableCellValue2Selector);

    if (elementToFind1.length > 0 && elementToFind2.length > 0) {
    //Actions of the step
            /**
     * Selector for the table cell 1
     * @type {String}
     */
    const tableCellValue1 = await $(tableCellValue1Selector).getText();
        /**
         * Selector for the table cell 2
         * @type {String}
         */
        const tableCellValue2 = await $(tableCellValue2Selector).getText();

        if (falseCase) {
            // console.log(tableCellValue1);
            // console.log(tableCellValue2);
            // console.log('Falsecase');
            if (tableCellValue1 != tableCellValue2) {
                return true;
            }
            // expect(parseInt(tableCellValue1,10)).not
            //     .toEqual(
            //         parseInt(tableCellValue2, 10),
            //         `Expected value on row await ${tableRow2}, cell await ${tableCell2} not to be "${tableCellValue1}"`
            //     );
        } else {
            // console.log(tableCellValue1);
            // console.log(tableCellValue2);
            // console.log('Not Falsecase');
            if (tableCellValue1 == tableCellValue2) {
                return true;
            }
            // expect(parseInt(tableCellValue1,10)).
            //     toEqual(
            //         parseInt(tableCellValue2, 10),
            //         `Expected value on row await ${tableRow2}, cell await ${tableCell2} to be "${tableCellValue1}"`
            //     );
        }
    }
    else {
        let screenshotName = 'Table-Cell-Comparison-NOT-POSSIBLE-NO-RECORDS-FOUND'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};
