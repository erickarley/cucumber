import { bigPause, mediumPause, smallPause } from '../../constants';
import focusLastOpenedWindow from '../focusLastOpenedWindow';
import pause from '../pause';
import closeLastOpenedWindow from '../closeLastOpenedWindow';
import checkAvailability from '../../check/Common/checkAvailability';
import getServerParam from '../../lib/getServerParam';

/**
 * click the chosen cell content
 * @param  {String}   reportType     The report type
 * @param  {String}   reportId     The report id
 * @param  {String}   rowNumber      The row to explore
 */
export default async(reportType, reportId, rowNumber) => {
    /**
     * Selector for the table Item
     * @type {String}
     */
    // await pause(mediumPause);
    const groupingSelector = "//span[.='Drag a column header and drop it here to group by that column'][@aria-hidden='true']";
    let elementToFind = await $$(groupingSelector);
    let drillableRecordsSelector;
    if (elementToFind.length > 0) {
         drillableRecordsSelector = "//table[@role]//tr[" + (rowNumber+1) + "]/td[not(@style[contains(.,'none')])]//span[@class[contains(.,'drillable')]]";
    }
    else {
        drillableRecordsSelector = "//table[@role]//tr[" + rowNumber + "]/td[not(@style[contains(.,'none')])]//span[@class[contains(.,'drillable')]]";
    }
    let cellsToClick = await $$(drillableRecordsSelector);
    const timeoutArg = process.argv.find(arg => arg.startsWith('--timeout='))?.split('=')[1];
    const dynamicTimeout = timeoutArg ? parseInt(timeoutArg, 10) : 100000;

    const fs = require('fs');
    let reportFolder = getServerParam();

    try {
        if (!fs.existsSync('./reports/'+ reportFolder + '/drilldown-report.txt')) {
            fs.writeFileSync('./reports/'+ reportFolder + '/drilldown-report.txt', 'Report-' + reportId + "\n", function (err) {
            });
        }
    } catch(err) {
        console.error("Drill down report error: " + reportId + " - " + err.message);
        throw new Error("Drill down report error: " + reportId + " - " + err.message);
    }
    const makeDir = require('make-dir');
    const newPath = makeDir.sync('./reports/'+ reportFolder + '/report-' + reportId);
    let drilldownlog = fs.readFileSync('./reports/'+ reportFolder + '/drilldown-report.txt');

    try {
        if (!fs.existsSync('./reports/'+ reportFolder + '/report-' + reportId + '/Report-' + reportId + '-drilldown.txt')) {
            fs.writeFileSync('./reports/'+ reportFolder + '/report-' + reportId + '/Report-' + reportId + '-drilldown.txt', 'Report-' + reportId + "\nValidation In Progress\n", function (err) {
            });
        }
    } catch(err) {
        console.error("Drill down results for report: " + reportId + " - " + err.message);
        throw new Error("Drill down results for report: " + reportId + " - " + err.message);
    }
    let results = fs.readFileSync('./reports/'+ reportFolder + '/report-' + reportId + '/Report-' + reportId + '-drilldown.txt');
    let resultMessage = '';
    let resultsInMs;
    let a = performance.now();        

    //Check if report has clickable cells
    if (cellsToClick.length > 0) {
        let numberOfClickableCells;
        if (reportType === 'Summary') {
            numberOfClickableCells = cellsToClick.length;
        }
        else {
            // const firstTrendHeaderSelector = "//thead[@role='rowgroup']/tr[1]/th[1][@role='columnheader']"
            const firstTrendHeaderSelector = "//thead[@role='rowgroup']/tr[1]/th[not(@style[contains(.,'none')])][not(@rowspan)]"
            let colspanFirstTrend = await (await $(firstTrendHeaderSelector)).getAttribute('colspan');
            console.log("Number of cells in first trend header: " + colspanFirstTrend );

            numberOfClickableCells = Number(colspanFirstTrend);
        }
        console.log("Number of cells to click for report " + reportId + " on row: " + numberOfClickableCells);
        for (let i = 0; i < numberOfClickableCells; i++) {
            // await clickElement('click', 'element', cellsToClick[i]);
            // console.log(cellsToClick[i]);
            await cellsToClick[i].click();
            console.log("Cell #" + (i+1) + " clicked");
            await pause(mediumPause);
            // await checkNewWindow();
            await focusLastOpenedWindow();
            // await pause(mediumPause);
            // await parameterizedPause();
            // await pause(mediumPause);
            await checkAvailability();

            // Wait for drilldown query result to render
            await browser.waitUntil(
                async () => {
                    const resultTitle = await $("//span[contains(text(),'Results') or contains(text(),'Query')]"); // adjust as needed
                    return resultTitle && await resultTitle.isDisplayed();
                },
                {
                    timeout: dynamicTimeout,
                    interval: 300,
                    timeoutMsg: `[drilldown] Query content did not render after clicking cell.`,
                }
            );

            results = results + 'Row-' + rowNumber + "-cell-" + i + '-successful\n';
            await closeLastOpenedWindow();
            
            await pause(smallPause);

            // Switch back to main window
            const handles = await browser.getWindowHandles();
            await browser.switchToWindow(handles[0]);
            await checkAvailability();

            // RE-QUERY DOM after window switch
            cellsToClick = await $$(drillableRecordsSelector); // 👈 refresh the array!

        }
        let b = performance.now();
        resultsInMs = b - a;
        //set to empty to clean the file if passed
        resultMessage = '';
        const now = new Date();
        const offset = -5 * 60; // Offset in minutes for GMT-5
        const gmtMinus5Time = new Date(now.getTime() + offset * 60000);

        // Format it in ISO 8601 style with correct offset
        const isoTimestamp = gmtMinus5Time.toISOString().replace('Z', '-05:00');

        const textWithTimestamp = `Test executed at: ${isoTimestamp}`;
        fs.writeFile('./reports/'+ reportFolder + '/drilldown-report.txt', drilldownlog + "\nReport " + reportId + " drilldown tests passed. Execution took:  " + Math.floor(resultsInMs)  + " miliseconds\n" + textWithTimestamp, (err) => {
            if (err)
            console.log(err);
            else {
            //   console.log("Report data written successfully - " + reportId + "\n");
            }
        });
    }
    //Checks for structure
    else {
        let tableContent = await $$("//*[@id='report-grid']//table//tr//div[@class='dataPointWrapper']");
        console.log("Content length: " + tableContent.length);
        if (tableContent.length == 0) {
            let b = performance.now();
            resultsInMs = b - a;
            resultMessage = "TESTS-PASSED-BUT-HAS-NO-DATA";
            results = results + resultMessage  + "\n";
            const now = new Date();
            const offset = -5 * 60; // Offset in minutes for GMT-5
            const gmtMinus5Time = new Date(now.getTime() + offset * 60000);

            // Format it in ISO 8601 style with correct offset
            const isoTimestamp = gmtMinus5Time.toISOString().replace('Z', '-05:00');

            const textWithTimestamp = `Test executed at: ${isoTimestamp}`;
            fs.writeFile('./reports/'+ reportFolder + '/drilldown-report.txt', drilldownlog + "\nReport " + reportId + " drilldown tests passed BUT report has NO DATA. Execution took: " + Math.floor(resultsInMs) + " miliseconds\n" + textWithTimestamp, (err) => {
                if (err)
                console.log(err);
                else {
                //   console.log("Report data written successfully - " + reportId + "\n");
                }
            });
        }
        else {
            let rowContent = await $$("//*[@id='report-grid']//table//tr[" + rowNumber +"]//div[@class='dataPointWrapper']");
            console.log("Content length: " + rowContent.length);
            if (rowContent.length == 0) {
                resultMessage = 'ROW-' + rowNumber + "--DOES-NOT-EXIST";
                results = results + resultMessage + "\n";
            }
            else {
                if (cellsToClick.length == 0) {
                    resultMessage = 'ROW-' + rowNumber + "-HAS-NO-CLICKABLE-CELLS";
                    results = results + resultMessage + "\n";
                }
            }
        }
    }
    fs.writeFile('./reports/'+ reportFolder + '/report-' + reportId + '/Report-' + reportId + '-drilldown.txt', "Validation Finished\n" + results, (err) => {
        if (err)
        console.log(err);
        else {
        //   console.log("Report data written successfully - " + reportId + "\n");
        }
    });
    fs.writeFile('./reports/execution-log-message.txt', resultMessage, (err) => {
        if (err)
        console.log(err);
        else {
        //   console.log("Report data written successfully - " + reportId + "\n");
        }
    });
    await pause(mediumPause);
};