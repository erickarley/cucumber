import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { extraLongPause, bigPause } from '../../constants';
import fs from 'fs-extra';
import makeDir from 'make-dir';
import getServerParam from '../../lib/getServerParam';

/**
 * Saves the data of a report and takes a screenshot for comparison.
 * @param  {String}     storageMediaType      Media type for storage (memory/disk)
 */
export default async (storageMediaType) => {
    let currentUrl = (await browser.getUrl()).replace(/http(s?):\/\//, '');
    let domain = `${currentUrl.split('/')[0]}`.split('.')[0];

    let reportId = currentUrl.split('/').pop();
    // 🔐 Store it in shared memory for later use (e.g., in waitForReportContent.js)
    await browser.sharedStore.set('reportId', reportId);
    await browser.sharedStore.set('entityType', "Report");
    
    const keyName = `Report-${reportId}-${domain}`;
    const screenshotsFolder = getServerParam();
    const dataPath = `./ScreenShots/${screenshotsFolder}/Data`;
    const reportPath = `./reports/${screenshotsFolder}/comparison_report.txt`;

    try {
        // Wait for the report container
        const reportContainerSelector = "//div[@id='report-grid']";
        await waitFor(reportContainerSelector, bigPause, null, 'exist');

        // Log child elements
        let containerElements = await $$(reportContainerSelector + "/*");
        console.log(`🔍 Found ${containerElements.length} child elements inside #report-grid`);

        // Wait for the table
        const reportTableSelector = "//div[@id='report-grid']/div[@class[contains(.,'k-auto-scrollable')]]/table";
        await waitFor(reportTableSelector, extraLongPause, null, 'exist');

        // Get content
        let textArray = await $$("//div[@id='report-grid']//tr");
        if (textArray.length === 0) {
            throw new Error("❌ Report table is empty or not properly loaded.");
        }

        let tableContent = [];
        for (let i = 0; i < textArray.length; i++) {
            tableContent.push(await textArray[i].getText());
        }

        if (storageMediaType === 'memory') {
            await browser.sharedStore.set(keyName, tableContent);
        }

        await makeDir(dataPath);
        fs.writeFileSync(`${dataPath}/${keyName}.json`, JSON.stringify(tableContent, null, 2));

        await browser.pause(500); // allow layout to stabilize
        const screenshotPath = `./ScreenShots/${screenshotsFolder}/${keyName}.png`;
        await browser.saveScreenshot(screenshotPath);
        // const container = await $("//div[@class='main-page']");
        // await container.scrollIntoView();
        // await browser.pause(500); // allow layout to stabilize
        // await container.saveScreenshot(screenshotPath);

        console.log(`📸 Report screenshot saved: ${screenshotPath}`);
        console.log(`📊 Report data saved: ${dataPath}/${keyName}.json`);
    } catch (error) {
        console.error(`❌ Failed to store report data for Report ${reportId}: ${error.message}`);
        await makeDir(`./reports/${screenshotsFolder}`);
        fs.appendFileSync(reportPath, `⚠️ Report "${reportId}" - Status: FAILED (Table Not Found or Unloaded)\n`);
        throw new Error(`Report "${reportId}" could not be processed due to missing or unloaded elements.`);
    }
};
