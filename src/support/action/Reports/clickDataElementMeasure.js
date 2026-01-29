import clickElement from '../clickElement';
import { longPause } from '../../constants';

/**
 * Data Element Item to Click
 * @param  {String} dataElementMeasureName The data element to choose
 */
export default async (dataElementMeasureName) => {
    const dataElementMeasureSelector = `//div[@class='itemList itemListWithSearch']//md-list-item//button[@title="${dataElementMeasureName}"]`;

    // console.log(`[Data Element] Attempting to find and click data element: "${dataElementMeasureName}"`);

    try {
        const el = await $(dataElementMeasureSelector);

        await browser.waitUntil(
            async () => await el.isExisting() && await el.isDisplayed(),
            {
                timeout: longPause,
                interval: 300,
                timeoutMsg: `[Data Element] "${dataElementMeasureName}" not found or visible.`,
            }
        );

        const classAttr = await el.getAttribute('class');

        // If already selected (active), skip click
        if (classAttr.includes('md-button') && classAttr.includes('active')) {
            // console.log(`[Data Element] "${dataElementMeasureName}" is already selected. Skipping click.`);
            return;
        }

        await browser.waitUntil(
            async () => await el.isEnabled(),
            {
                timeout: longPause,
                interval: 300,
                timeoutMsg: `[Data Element] "${dataElementMeasureName}" is not enabled.`,
            }
        );

        // console.log(`[Data Element] Found and verified "${dataElementMeasureName}", clicking now...`);
        await clickElement('click', 'element', dataElementMeasureSelector);

    } catch (error) {
        const screenshotPath = `./ScreenShots/DataElement-${dataElementMeasureName.replace(/\s+/g, '-')}-${Date.now()}.png`;
        await browser.saveScreenshot(screenshotPath);
        console.error(`[Data Element] Failed to click "${dataElementMeasureName}". Screenshot saved: ${screenshotPath}`);
        throw error;
    }
};
