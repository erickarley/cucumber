import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { longPause, smallPause } from '../../constants';
import pause from '../pause';
import checkAvailability from '../../check/Common/checkAvailability';

/**
 * Clicks the data element measure if visible and enabled.
 * Adds retry and better diagnostics for timing issues.
 * @param  {String} dataElementName - The data element to choose
 */
export default async (dataElementName) => {
    const selector = `//div[@id='dataElements']//md-list-item//button[@title='${dataElementName}']`;

    let retries = 2;
    let attempt = 0;
    let success = false;

    await checkAvailability(); 

    while (attempt < retries && !success) {
        try {
            // console.log(`[Select Data Element] Attempt ${attempt + 1} - Waiting for ${dataElementName}`);
            await waitForDisplayed(selector);
            await waitFor(selector, longPause, null, 'enabled');
            await clickElement('click', 'element', selector);
            await pause(1000);
            // console.log(`[Select Data Element] ✅ Successfully clicked "${dataElementName}"`);
            success = true;
        } catch (err) {
            // console.warn(`[Select Data Element] ⚠️ Attempt ${attempt + 1} failed for "${dataElementName}": ${err.message}`);
            if (attempt < retries - 1) {
                await pause(2000); // brief buffer between retries
            }
        }
        attempt++;
    }

    if (!success) {
        throw new Error(`[Select Data Element] ❌ Failed to click "${dataElementName}" after ${retries} attempts.`);
    }
};
