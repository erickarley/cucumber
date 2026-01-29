import waitForDisplayed from '../waitForDisplayed';
import clickElement from '../clickElement';
import pause from '../pause';
import { longPause } from '../../constants';

/**
 * Selects an option from a 2020-style dropdown using its label and matching option.
 *
 * @param {string} dropDownSelector - XPath or CSS selector for the dropdown <md-select>
 * @param {string} optionsSelector - XPath for the <md-option> matching the desired value
 * @param {string} optionName - Label of the option for logging and screenshots
 */
export default async (dropDownSelector, optionsSelector, optionName) => {
    const dropdowns = await $$(dropDownSelector);
    if (dropdowns.length === 0) {
        const screenshotName = `DropDown-NoMatch-${sanitize(optionName)}-${timestamp()}`;
        await browser.saveScreenshot(`./ScreenShots/${screenshotName}.png`);
        throw new Error(`[Dropdown] No dropdown found for selector: ${dropDownSelector}`);
    }

    // console.log(`[Dropdown] Clicking dropdown for "${optionName}"...`);
    await clickElement('click', 'element', dropDownSelector);
    await pause(300); // short delay to render options

    const option = await $(optionsSelector);
    await browser.waitUntil(
        async () => await option.isDisplayed(),
        {
            timeout: longPause,
            timeoutMsg: `[Dropdown] Option "${optionName}" not visible after opening dropdown.`,
        }
    );

    try {
        await option.waitForClickable({ timeout: longPause });
        await clickElement('click', 'element', optionsSelector);
        await pause(300); // animation time
    } catch (error) {
        const screenshotName = `DropDown-ClickFail-${sanitize(optionName)}-${timestamp()}`;
        await browser.saveScreenshot(`./ScreenShots/${screenshotName}.png`);
        throw new Error(`[Dropdown] Failed to click option "${optionName}": ${error.message}`);
    }
};

// Util: Clean string for screenshot names
function sanitize(str) {
    return str.replace(/[^\w\d-]/g, '-');
}

// Util: Add timestamp
function timestamp() {
    return new Date().toISOString().replace(/[:.]/g, '-');
}
