import waitLoadingGif from '../Common/waitLoadingGif';

/**
 * Check the data of the table on a specific cell
 * @param  {Number}     cellNumber   Cell number to check
 * @param  {Number}     rowNumber    Row number of the table
 */
export default async(cellNumber, rowNumber) => {
    
    /**
     * Selector for the filterNames option
     * @type {String}
     */
    const tableDataCellSelector = "//tr["+ rowNumber +"]/td["+ cellNumber +"]";

   await waitLoadingGif(true);

    let elementToFind = await $$(tableDataCellSelector);

    if (elementToFind.length > 0) {
    //Actions of the step
        const text = await $(tableDataCellSelector).getText();
        await browser.sharedStore.set('cell-'+ rowNumber + '-' + cellNumber, text);
    }
    else {
        let screenshotName = 'Expected-Text-On-Table-Cell-' + expectedText + '-NOT-FOUND'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};