import fs from 'fs-extra';
import resemble from 'resemblejs';
import { MAX_VISUAL_DIFFERENCE, MIN_TEXT_SIMILARITY } from '../../config/comparisonSettings.js';
import getServerParam from '../../lib/getServerParam';

/**
 * Compares report results and screenshots between two environments.
 * @param  {String}     storageMediaType      Media type for storage (memory/disk)
 * @param  {String}     reportId              Report ID to compare
 */
export default async (storageMediaType, reportId) => {
    let currentUrl = (await browser.getUrl()).replace(/http(s?):\/\//, '');
    let domain = `${currentUrl.split('/')[0]}`.split('.')[0];

    let userArguments = process.argv;
    const hasServer = (element) => element.includes('server');
    const serverParamIndex = userArguments.findIndex(hasServer);
    let environmentURL = userArguments[serverParamIndex].substring(7);
    let previousSystem = environmentURL.split('.')[0];

    let keyName1 = `Report-${reportId}-${previousSystem}`;
    let keyName2 = `Report-${reportId}-${domain}`;

    const screenshotsFolder = getServerParam();

    // let screenshotsFolder = await browser.sharedStore.get('screenshotsFolder');

    // Paths for data and screenshots
    const dataPath1 = `./ScreenShots/${screenshotsFolder}/Data/${keyName1}.json`;
    const dataPath2 = `./ScreenShots/${screenshotsFolder}/Data/${keyName2}.json`;
    const screenshot1 = `./ScreenShots/${screenshotsFolder}/${keyName1}.png`;
    const screenshot2 = `./ScreenShots/${screenshotsFolder}/${keyName2}.png`;
    const diffScreenshotPath = `./ScreenShots/${screenshotsFolder}/Report-${reportId}-diff.png`;

    let reportData1, reportData2;

    // Read stored data for the first environment
    try {
        reportData1 = JSON.parse(fs.readFileSync(dataPath1, "utf8"));
    } catch (error) {
        console.error(`❌ Error reading stored report data for first environment: ${error.message}`);
        reportData1 = null;
    }

    // Read stored data for the second environment
    try {
        reportData2 = JSON.parse(fs.readFileSync(dataPath2, "utf8"));
    } catch (error) {
        console.error(`❌ Error reading stored report data for second environment: ${error.message}`);
        reportData2 = null;
    }

    if (!reportData1 || !reportData2) {
        const reportPath = `./reports/${screenshotsFolder}/comparison_report.txt`;
        fs.appendFileSync(reportPath, `⚠️ Report "${reportId}" - Status: FAILED (Data Missing)\n\n`);
        await browser.sharedStore.set('reportId', null);
        await browser.sharedStore.set('entityType', null);
        throw new Error(`Stored data missing for Report ${reportId}`);
    }

    console.log(`🔍 Comparing Report Data: ${keyName1} vs ${keyName2}`);

    // Compare text similarity
    let textSimilarityScore = calculateTextSimilarity(reportData1.join(" "), reportData2.join(" "));

    // Screenshot comparison
    let visualMismatch = 0;
    await new Promise((resolve) => {
        resemble(screenshot1)
            .compareTo(screenshot2)
            .ignoreAntialiasing()
            .ignoreColors()
            .scaleToSameSize()
            .onComplete((data) => {
                visualMismatch = parseFloat(data.misMatchPercentage);
                console.log(`🔍 Visual Difference: ${visualMismatch.toFixed(2)}%`);

                if (visualMismatch > 1) {
                    console.log("❌ Significant visual differences detected!");
                    if (data.getImageDataUrl) {
                        fs.writeFileSync(diffScreenshotPath, data.getImageDataUrl().replace(/^data:image\/png;base64,/, ""), "base64");
                        console.log(`🔍 Difference image saved: ${diffScreenshotPath}`);
                    }
                } else {
                    console.log("✅ Screenshots are visually similar.");
                }
                resolve();
            });
    });

    // Append results to the comparison report
    const reportPath = `./reports/${screenshotsFolder}/comparison_report.txt`;
    const testStatus = (visualMismatch > MAX_VISUAL_DIFFERENCE || textSimilarityScore < MIN_TEXT_SIMILARITY) ? "FAILED" : "PASSED";

    fs.appendFileSync(reportPath,
        `📊 Report: ${reportId} - Status: ${testStatus}\n` +
        `  🔍 Visual Difference: ${visualMismatch.toFixed(2)}%\n` +
        `  🔤 Text Similarity: ${(textSimilarityScore * 100).toFixed(2)}%\n\n`
    );

    if (testStatus === "FAILED") {
        await browser.sharedStore.set('reportId', null);
        await browser.sharedStore.set('entityType', null);
        throw new Error(`❌ Differences found in Report ${reportId}`);
    } else {
        console.log(`✅ No significant differences in Report ${reportId}`);
    }

};

function calculateTextSimilarity(str1, str2) {
    const lev = (a, b) => {
        let tmp;
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;
        if (a.length > b.length) tmp = a, a = b, b = tmp;
        const row = Array(a.length + 1).fill().map((_, i) => i);
        for (let i = 1; i <= b.length; i++) {
            let prev = i;
            for (let j = 1; j <= a.length; j++) {
                let val = (b[i - 1] === a[j - 1]) ? row[j - 1] : Math.min(row[j - 1] + 1, prev + 1, row[j] + 1);
                row[j - 1] = prev;
                prev = val;
            }
            row[a.length] = prev;
        }
        return 1 - (row[a.length] / Math.max(str1.length, str2.length));
    };
    return lev(str1, str2);
}