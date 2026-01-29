import { bigPause, mediumPause, smallPause } from '../../constants';
import focusLastOpenedWindow from '../focusLastOpenedWindow';
import pause from '../pause';
import closeLastOpenedWindow from '../closeLastOpenedWindow';
import checkAvailability from '../../check/Common/checkAvailability';

/**
 * click the chosen cell content
 * @param  {String}   obsolete      The same functionality applies
 * @param  {String}   reportId     The report id
 * @param  {String}   rowNumber      The row to explore
 */
export default async(obsolete, reportId, rowNumber) => {
    /**
     * Selector for the table Item
     * @type {String}
     */
    const tableItemIcon = "//table[@role]//tr[" + rowNumber + "]/td[not(@style='display:none')]//span[@class[contains(.,'drillable')]]";

    let cellsToClick = await $$(tableItemIcon);

    const makeDir = require('make-dir');
    const newPath = makeDir.sync('./reports/report-' + reportId);
    const fs = require('fs');
    try {
        if (!fs.existsSync('./reports/report-' + reportId + '/Report-' + reportId + '-drilldown.txt')) {
            fs.writeFileSync('./reports/report-' + reportId + '/Report-' + reportId + '-drilldown.txt', 'Report-' + reportId + "\n", function (err) {
            });
        }
    } catch(err) {
        console.error("Drill down results for report: " + reportId + " - " + err.message);
        throw new Error("Drill down results for report: " + reportId + " - " + err.message);
    }
    let results = fs.readFileSync('./reports/report-' + reportId + '/Report-' + reportId + '-drilldown.txt');
    let row = 0;
    let column = 0;
    if (cellsToClick.length > 0) {
        
        /**
         * Selector for the table Item
         * @type {String}
         */
        const firstTrendHeaderSelector = "//thead[@role='rowgroup']/tr[1]/th[1][@role='columnheader']"
        let colspanFirstTrend = await (await $(firstTrendHeaderSelector)).getAttribute('colspan');
        console.log("Number of cells in first trend header: " + colspanFirstTrend );

        // let firstSet = 
        // console.log("Number of cells to click for report " + reportId + " on row: " + cellsToClick.length);
        // console.log("Number of cells from first trend for report " + reportId + " on row: " + cellsToClick.length);
        for (let i = 1; i <= parseInt(colspanFirstTrend); i++) {
            // await clickElement('click', 'element', cellsToClick[i]);
            // console.log(cellsToClick[i]);
            /**
             * Selector for the table cell to click
             * @type {String}
             */
            const cellToClickSelector = "//table[@role]//tr[" + rowNumber + "]/td[not(@style='display:none')][" + i + "]//span[@class[contains(.,'drillable')]]";

            let cellToClick = await $$(cellToClickSelector);
            // console.log("cell #" + i + ": " + await cellToClick);

            if (cellToClick.length > 0) {
                // console.log("cell #" + i + ": " + await cellToClick[0].getText());
                await cellToClick[0].click();
                // console.log("Cell #" + (i) + " clicked");
                await pause(bigPause);
                // await checkNewWindow();
                await focusLastOpenedWindow();
                await pause(mediumPause);
                await checkAvailability();
                await pause(mediumPause);
                await checkAvailability();
                await browser.waitUntil(
                    async () => (await $("//div[@class='flex1 spacer']//span[contains(.,'Results')]").isExisting()),
                    {
                        timeout: bigPause,
                        timeoutMsg: 'Validation of results from drill down failed'
                    }
                );
                results = results + 'Row-' + rowNumber + "-cell-" + i + '-successful\n';
                fs.writeFile('./reports/report-' + reportId + '/Report-' + reportId + '-drilldown.txt', results, (err) => {
                    if (err)
                    console.log(err);
                    else {
                    //   console.log("Report data written successfully - " + reportId + "\n");
                    }
                });
                await closeLastOpenedWindow();
                await pause(smallPause);
                await focusLastOpenedWindow();
                await checkAvailability();
                console.log("Query for Cell # " + (i + 1) + " Verified")    
            }
        }
        fs.writeFile('./reports/drilldown-report.txt', "Report " + reportId + " drilldown tests passed\n", (err) => {
            if (err)
            console.log(err);
            else {
            //   console.log("Report data written successfully - " + reportId + "\n");
            }
        });
    }
    else {
        let screenshotName = 'Drill Down-Row-' + rowNumber + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};