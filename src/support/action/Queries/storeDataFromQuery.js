import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { extraLongPause, bigPause } from '../../constants';
import fs from 'fs-extra';
import makeDir from 'make-dir';
import getServerParam from '../../lib/getServerParam';

/**
 * Saves the data of a query and takes a screenshot for comparison.
 * @param  {String}     storageMediaType      Media type for storage (memory/disk)
 */
export default async (storageMediaType) => {
    let currentUrl = (await browser.getUrl()).replace(/http(s?):\/\//, '');
    let domain = `${currentUrl.split('/')[0]}`.split('.')[0];

    // **Step 1: Wait for the table container first**
    const queryContainerSelector = "//div[@id='stickyGrid']";
    await waitFor(queryContainerSelector, bigPause, null, 'exist');

    // **Step 2: Log all child elements to check table existence**
    let containerElements = await $$(queryContainerSelector + "/*");
    console.log(`🔍 Found ${containerElements.length} child elements inside #stickyGrid`);

    // **Step 3: Wait for the actual table to appear**
    const queryTableSelector = "//div[@id='stickyGrid']/div[@class[contains(.,'k-auto-scrollable')]]/table";
    await waitFor(queryTableSelector, extraLongPause, null, 'exist');

    let textArray = await $$("//div[@id='stickyGrid']//tr");
    if (textArray.length === 0) {
        throw new Error("❌ Query table is empty or not properly loaded.");
    }

    let tableContent = [];
    for (let i = 0; i < textArray.length; i++) {
        tableContent.push(await textArray[i].getText());
    }

    let queryId = await browser.getUrl();
    queryId = queryId.substring(queryId.lastIndexOf('/') + 1);
    await browser.sharedStore.set('reportId', queryId);
    await browser.sharedStore.set('entityType', "Query");
    let keyName = `Query-${queryId}-${domain}`;

    // Extract and reuse server/reportFolder across entire config
    const screenshotsFolder = getServerParam();
    // let screenshotsFolder = await browser.sharedStore.get('screenshotsFolder');

    // **Store data in memory**
    if (storageMediaType === 'memory') {
        await browser.sharedStore.set(keyName, tableContent);
    }

    // **Ensure directory exists**
    const dataPath = `./ScreenShots/${screenshotsFolder}/Data`;
    await makeDir(dataPath);

    // **Save structured query data**
    fs.writeFileSync(`${dataPath}/${keyName}.json`, JSON.stringify(tableContent, null, 2));

    // **Take Screenshot**
    let screenshotPath = `./ScreenShots/${screenshotsFolder}/${keyName}.png`;
    // await browser.saveScreenshot(screenshotPath);

    const container = await $("//div[@class='main-page']");
    await container.scrollIntoView();
    await browser.pause(500); // allow layout to stabilize
    await container.saveScreenshot(screenshotPath);

    console.log(`📸 Query screenshot saved: ${screenshotPath}`);
    console.log(`📊 Query data saved: ${dataPath}/${keyName}.json`);
};
