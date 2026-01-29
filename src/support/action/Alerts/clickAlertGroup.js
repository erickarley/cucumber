import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import pause from '../pause';
import { smallPause } from '../../constants';

/**
 * Clicks an item row on the table (2020 version)
 * @param  {String|Number}   rowNumber   Index of the row to click (1-based)
 */
export default async (rowNumber) => {
    if (!rowNumber || isNaN(rowNumber)) {
        throw new Error(`[RowClick] Invalid rowNumber: ${rowNumber}`);
    }

    const rowNumberSelector = `(//md-card)[${rowNumber}]//md-card-title-text/span[@class="alertCardTitle"]`;

    const elements = await $$(rowNumberSelector);

    if (elements.length > 0) {
        try {
            await waitForDisplayed(rowNumberSelector);
            const isClickable = await $(rowNumberSelector).isClickable();

            if (!isClickable) {
                console.warn(`[RowClick] Row ${rowNumber} exists but is not clickable. Waiting a bit more...`);
                await pause(smallPause);
            }

            await clickElement('click', 'element', rowNumberSelector);
        } catch (err) {
            const screenshotName = `Row-${rowNumber}-Click-Failed.png`;
            await browser.saveScreenshot(`./ScreenShots/${screenshotName}`);
            console.error(`[RowClick] Error clicking row ${rowNumber}. Screenshot: ${screenshotName}`);
            throw err;
        }
    } else {
        const screenshotName = `Row-${rowNumber}-NOT-EXISTS.png`;
        await browser.saveScreenshot(`./ScreenShots/${screenshotName}`);
        throw new Error(`[RowClick] Row ${rowNumber} not found. Screenshot saved as ${screenshotName}`);
    }
};
