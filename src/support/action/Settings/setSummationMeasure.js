import select2020DropDown from '../Common/select2020DropDown';
import clickElement from '../clickElement';
import setInputfield from '../setInputField';
import pause from '../pause';
import { smallPause } from '../../constants';
/**
 * Adds summary column to summation tab.
 */
export default async (dimension, summaryColumns, historicalData, daysToBackfill) => {
    const dimensionSelector = "//md-select[@placeholder='Choose A Dimension']";
    const dimensionOptionSelector = `//md-option[@ng-value='item.Name'][.='${dimension}']`;
    const filterSelector = "//input[@ng-model='measures.filterString']";
    const firstItemOnFiltersList = "//div[@class[contains(.,'list-item')]][1]";
    const historicalDataSwitchSelector = "//md-switch[.='Summarize Historical Data']";
    const daysToBackfillSelector = "//input[@name='backfill']";

    // Select Dimension
    await select2020DropDown(dimensionSelector, dimensionOptionSelector, dimension);

    // Type into filter input
    await $(filterSelector).setValue(summaryColumns);
    await pause(smallPause); // still give UI a short moment to render

    const listedItem = await $(firstItemOnFiltersList);
    try {
        await listedItem.waitForExist({ timeout: 5000 });
        await listedItem.waitForDisplayed({ timeout: 5000 });

        const listedText = await listedItem.getText();
        if (listedText.trim().toLowerCase() === summaryColumns.trim().toLowerCase()) {
            await clickElement('click', 'element', firstItemOnFiltersList);
            await pause(smallPause);
        } else {
            throw new Error(`[Filter Match] Expected "${summaryColumns}", but found "${listedText}"`);
        }

    } catch (err) {
        const screenshotName = `Error-Filter-${summaryColumns.replace(/\s+/g, '-')}-NOT-EXISTS-${Date.now()}`;
        await browser.saveScreenshot(`./ScreenShots/${screenshotName}.png`);
        console.warn(`[Filter Match] ${err.message}`);
        // optionally do not throw if non-critical
        throw new Error(`Filter "${summaryColumns}" not found. Screenshot: ${screenshotName}`);
    }

    // Set historical toggle
    if (historicalData === "On") {
        await clickElement('click', 'element', historicalDataSwitchSelector);
    }

    // Set days to backfill
    await setInputfield('set', daysToBackfill, daysToBackfillSelector);
};
