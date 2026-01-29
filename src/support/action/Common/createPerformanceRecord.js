import pause from '../../action/pause';
import { mediumPause, smallPause } from '../../constants'
/**
 * Check the performance after a report/dashboard/query execution
 * @param  {String}   objectType       dashboard, report, query
 * @param  {String}   objectId          id of the object
 * @param  {String}   userName          username executing the object
 */
export default async (objectType, objectId, userName) => {
    try {

        /**
         * The Overlay selector
         * @type {String}
         */
        const overlaySelector = "//div[@flag='controller.isLoading'][@style='display: flex;']";
        let performanceResult;
        let reportFolder;
        var fs = require('fs');
        try {
            if (fs.existsSync('./reports/reportFolder.txt')) {
                reportFolder = fs.readFileSync('./reports/reportFolder.txt');
            }
        } catch(err) {
            console.error("Report folder file error: " + err.message);
            throw new Error("Errors on report folder file");
        }
        
        try {
            if (fs.existsSync('./reports/' + reportFolder + '/PerformanceReport.txt')) {
                performanceResult = fs.readFileSync('./reports/' + reportFolder + '/PerformanceReport.txt');
            }
            else {
                fs.writeFileSync('./reports/' + reportFolder + '/PerformanceReport.txt', reportFolder, function (err) {
                });
                performanceResult = '';
                // console.log("Creating the log file");
            }
        } catch(err) {
            console.error("Performance result file error: " + err.message);
            throw new Error("Errors on performance results file");
        }

        let a = performance.now();
        if (objectType === "report") {
            await pause(mediumPause);
        }
        else if (objectType === "query") {
            await pause(smallPause);
        }
        else if (objectType === "dashboard") {
            await pause(mediumPause);
        }
        
        while (await $(overlaySelector).isDisplayed()) {
            await pause(smallPause);
            console.log("Waiting");
        }

        while (await $("//div[@class='k-loading-mask']").isDisplayed()) {
            await pause(smallPause);
            console.log("Waiting for loading image");
        }

        while (await $("//div[@ng-show='progress.show'][@aria-hidden='false']").isDisplayed()) {
            await pause(smallPause);
            console.log("Waiting for progress circle");
        }
        let b = performance.now();
        console.log(`${objectType.toUpperCase()}-${objectId} executed by user: ${userName} took: ${b-a} miliseconds`);
        fs.writeFileSync('./reports/' + reportFolder + '/PerformanceReport.txt', `${performanceResult}\n${objectType.toUpperCase()}-${objectId} executed by user: ${userName} took: ${b-a} miliseconds`, function (err) {
        });
    } catch(err) {
        console.error("Gato con botas");
        throw new Error("Gato con botas");
    }
    
};
