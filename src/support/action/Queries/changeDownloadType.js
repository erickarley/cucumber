import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { bigPause, mediumPause } from '../../constants';
import pause from '../pause';

/**
 * Safely change a dropdown value and verify that it actually changed on the UI
 * Retries until the expected UI state is confirmed.
 * 
 * @param {String} obsolete             - Not used
 * @param {String} previousTypeText     - Text currently displayed in dropdown
 * @param {String} newTypeText          - Option text to select
 */
export default async (obsolete, previousTypeText, newTypeText) => {
    const typeButtonSelector = `//md-select-value//div[contains(.,'${previousTypeText}')]`;
    const optionSelector = `//md-option//div[contains(.,'${newTypeText}')]`;
    const verificationSelector = `//md-select-value//div[contains(.,'${newTypeText}')]`;

    const maxRetries = 5;
    let attempt = 0;
    let success = false;

    while (attempt < maxRetries && !success) {
        attempt++;
        // console.log(`🔁 [Attempt ${attempt}/${maxRetries}] Changing type from "${previousTypeText}" to "${newTypeText}"`);

        // --- Wait for dropdown to be ready ---
        await waitForDisplayed(typeButtonSelector);
        await waitFor(typeButtonSelector, bigPause, null, 'enabled');

        // --- Click dropdown ---
        await clickElement('click', 'element', typeButtonSelector);
        await pause(500); // small stabilization pause

        // --- Wait for and click desired option ---
        await waitForDisplayed(optionSelector);
        await waitFor(optionSelector, bigPause, null, 'enabled');
        await clickElement('click', 'element', optionSelector);

        // --- Wait and verify the change happened in the UI ---
        await pause(mediumPause);

        const isUpdated = await browser.$(verificationSelector).isDisplayed().catch(() => false);
        if (isUpdated) {
            // console.log(`✅ Type successfully changed to "${newTypeText}"`);
            success = true;
            break;
        } else {
            console.warn(`⚠️  Change not visible yet after attempt ${attempt}, retrying...`);
            await pause(1000);
        }
    }

    if (!success) {
        throw new Error(`❌ Failed to change type to "${newTypeText}" after ${maxRetries} attempts`);
    }
};
