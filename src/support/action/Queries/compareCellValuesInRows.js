import waitLoadingGif from "../../check/Common/waitLoadingGif";

/**
 * Check the data of the table on a specific cell
 * @param  {Number}     cellNumber   Cell number to check
 */
export default async(cellNumber) => {
    
    /**
     * Selector for the filterNames option
     * @type {String}
     */
    const tableDataCellSelector = "//tr[2]/td["+ cellNumber +"]";

   await waitLoadingGif(true);

    let elementToFind = await $$(tableDataCellSelector);

    if (elementToFind.length > 0) {
    //Actions of the step
        const text = await $(tableDataCellSelector).getText();
        const tableDataCellSelector2 = "//tr[3]/td["+ cellNumber +"]";
        const text2 = await $(tableDataCellSelector2).getText();
       await waitLoadingGif
        if (text === text2) {
            return true;
        }
        else {
            let screenshotName = 'Table-Cells-for-rows-2-and-3-NOT-EQUAL'; 
            screenshotName = screenshotName.replace(/\//g,'-');
            await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
            throw Error(screenshotName);
        }
    }
    else {
        let screenshotName = 'Table-Cell-' + cellNumber + '-NOT-FOUND'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};