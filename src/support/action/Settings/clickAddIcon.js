import clickElement from '../clickElement';
import waitFor from '../waitFor';
import pause from '../pause'; // Optional buffer if needed
import { longPause } from '../../constants';

/**
 * Clicks the add icon next to a given link name on the Settings page.
 * @param {String} linkName The visible link text to target
 */
export default async (linkName) => {
    const addIconSelector = `//p[.='${linkName}']/parent::a/following-sibling::a`;

    try {
        // Wait for the add icon to exist and be enabled
        await waitFor(addIconSelector, longPause, null, 'enabled');

        // Optional pause to stabilize flaky UI transitions
        // await pause(500);

        await clickElement('click', 'element', addIconSelector);

        // console.log(`[Click Add Icon] ✅ Clicked add icon next to "${linkName}"`);
    } catch (err) {
        const screenshot = `ClickAddIconFailed-${linkName.replace(/\s+/g, '-')}-${Date.now()}.png`;
        await browser.saveScreenshot(`./ScreenShots/${screenshot}`);
        // console.warn(`[Click Add Icon] ❌ Failed to click add icon next to "${linkName}". Screenshot: ${screenshot}`);
        throw err;
    }
};
