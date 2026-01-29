import checkAvailability from './checkAvailability';
/**
 * Check the performance after a report/dashboard/query execution
 * @param  {String}   typeOfObject       
 * @param  {String}   nameOfObject       
 */
export default async (typeOfObject, nameOfObject) => {
    //Navigation fixes pending in queries and dashboards
    let a = await browser.sharedStore.get('PerformanceResultA');
    await checkAvailability();
    let b = performance.now();
    let resultsInMs = b-a;
    console.log(`Number of miliseconds for ${typeOfObject} - ${nameOfObject}: ${resultsInMs}`);
    let previousPerformance = await browser.sharedStore.get('PerformanceResult');
    // console.log(previousPerformance);
    if (previousPerformance != undefined) {
        await browser.sharedStore.set('PerformanceResultB', String(resultsInMs) + ' ms');
        // console.log('Setting up Performance B')
    }
    else {
        await browser.sharedStore.set('PerformanceResult', String(resultsInMs) + ' ms');
        // console.log('Setting up Performance A');
    }
    const fs = require('fs');

    let reportFolder;
    try {
        // Read the report folder name from reportFolder.txt
        if (fs.existsSync('./reports/reportFolder.txt')) {
            reportFolder = fs.readFileSync('./reports/reportFolder.txt', 'utf8').trim();
        } else {
            throw new Error("Report folder file not found.");
        }

        const reportFilePath = `./reports/${reportFolder}/SingleSystemPerformanceReport.txt`;

        // Check if the report file exists before attempting to read from it
        if (fs.existsSync(reportFilePath)) {
            // Read performance results from the performance report file
            const performanceResults = fs.readFileSync(reportFilePath, 'utf8');

            // Write performance results back to the performance report file
            fs.writeFileSync(reportFilePath, performanceResults + `\nObject Id: ${nameOfObject} - Execution time: ${String(resultsInMs)}`);
        } else {
            throw new Error(`Performance report file '${reportFilePath}' not found.`);
        }
    } catch(err) {
        console.error("Error:", err.message);
        throw new Error("Error processing performance report file");
    }
    
};
