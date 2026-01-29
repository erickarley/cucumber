import waitForDisplayed from '../../action/waitForDisplayed';
import checkLoadingOverlay from '../Common/checkLoadingOverlay';
import checkOverlay from '../Common/checkOverlay';
import waitLoadingGif from '../Common/waitLoadingGif';

/**
 * Check the data of the table on a specific cell
 * @param  {Number}     cellNumber   Cell number to check
 * @param  {Number}     rowNumber    Row number of the table
 * @param  {Type}     falseCase    Whether to check if the text matches the
 *                                  expected value or not
 * @param  {String}     expectedText The expected text
 */
export default async(cellNumber, rowNumber, falseCase, expectedText) => {
    
    /**
     * Selector for the filterNames option
     * @type {String}
     */
    const tableDataCellSelector = "//tr["+ rowNumber +"]/td["+ cellNumber +"]";

    // checkLoadingOverlay(true);
    // checkOverlay(true);
    await waitLoadingGif(true);

    let elementToFind = await $$(tableDataCellSelector);

    if (elementToFind.length > 0) {
    //Actions of the step
        /**
         * The text of the cell
         * @type {String}
         */
        const text = await $(tableDataCellSelector).getText();
        //console.log(text);
        if (falseCase) {
            expect(text).not
                .toEqual(
                    expectedText,
                    `Expected text not to be "${expectedText}"`
                );
        } else {
            expect(text)
                .toEqual(
                    expectedText,
                    `Expected text to be "${expectedText}" but found "${text}"`
                );
        }
    }
    else {
        if (falseCase) {
            // console.log("Element Not Found Is Expected");
            return true;
        }
        else {
            let screenshotName = 'Expected-Text-On-Table-Cell-' + expectedText + '-NOT-FOUND'; 
            screenshotName = screenshotName.replace(/\//g,'-');
            await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
            throw Error(screenshotName);
        }
    }
    // waitForDisplayed(tableDataCellSelector);
};