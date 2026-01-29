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
 * @param  {String}     expectedIcon The expected icon
 */
export default async(cellNumber, rowNumber, falseCase, expectedIcon) => {
    
    /**
     * Selector for the filterNames option
     * @type {String}
     */
    const tableDataCellSelector = "//tr["+ rowNumber +"]/td["+ cellNumber +"]";


    await waitLoadingGif(true);

    let elementToFind = await $$(tableDataCellSelector);

    if (elementToFind.length > 0) {
    //Actions of the step
        /**
         * The text of the cell
         * @type {String}
         */

        const iconSelector = '.info-button';
        const iconElement = await elementToFind[0].$(iconSelector);
        let icon = await iconElement.getAttribute("icon");
        //console.log(icon);

        if (falseCase) {
            expect(icon).not
                .toEqual(
                    expectedIcon,
                    `Expected text not to be "${expectedIcon}"`
                );
        } else {
            expect(icon)
                .toEqual(
                    expectedIcon,
                    `Expected text to be "${expectedIcon}" but found "${icon}"`
                );
        }
    }
    else {
        if (falseCase) {
            // console.log("Element Not Found Is Expected");
            return true;
        }
        else {
            let screenshotName = 'Expected-Icon-On-Table-Cell-' + expectedIcon + '-NOT-FOUND'; 
            screenshotName = screenshotName.replace(/\//g,'-');
            await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
            throw Error(screenshotName);
        }
    }
    // waitForDisplayed(tableDataCellSelector);
};