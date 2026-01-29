import checkContainsText from "../checkContainsText";
/**
 * Check if the given string is in the column name path
 * @param  {String}   falseCase       Whether to check if the given string is in
 *                                    the column name path or not
 * @param  {Number}   colunmNumber    Column number to check
 * @param  {String}   expectedContent The string to check for
 */
export default async(falseCase, colunmNumber, expectedContent) => {
    /**
     * The column selector
     * @type {String}
     */
    const columnSelector = "//div[@kendo-grid='tenderCtrl.tenderGrid']//td[" + colunmNumber +"]";
    

    let elementToFind = await $$(columnSelector);

    if (elementToFind.length > 0) {
        /**
         * The column selector
         * @type {String}
         */
        const textOnCell = await (await $(columnSelector)).getText();
        console.log(textOnCell);
        if (textOnCell.indexOf(expectedContent) > 0) {
            return true;
        }
        else {
            return false;
        }
        // checkContainsText("element", columnSelector, falseCase, expectedContent);
        // await isExisting(columnSelector,falseCase);
    }
    else {
        let screenshotName = 'InfoBox-TransactionHistory-' + expectedContent + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);

    }
    
};
