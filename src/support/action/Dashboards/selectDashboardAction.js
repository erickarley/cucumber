import clickElement from '../clickElement';
import waitFor from '../waitFor';
import pause from '../pause';
import waitForAppReady from '../../lib/waitForAppReady';
import { hugePause, smallPause, mediumPause } from '../../constants';

/**
 * Clicks a top-right action (Save, Favorite, Run, Quick Query).
 * Includes CI-safe refresh retry if button never becomes enabled.
 */
export default async (actionName) => {

    const containerSelector = '.titlebar-buttons';
    const actionIcon = `//button[@title='${actionName}']`;

    const attemptClick = async (attemptLabel) => {
        // console.log(`[Action:${actionName}] Attempting click (${attemptLabel})`);

        await browser.waitUntil(
            async () => {
                const btn = await $(actionIcon);
                return await btn.isExisting() && await btn.isDisplayed();
            },
            {
                timeout: hugePause,
                interval: 500,
                timeoutMsg: `[Action:${actionName}] Button did not appear`
            }
        );

        await waitFor(actionIcon, hugePause, null, 'enabled');
        await clickElement('click', 'button', actionIcon);
        await pause(mediumPause);
    };

    // ---- Ensure container exists ----
    const container = await $(containerSelector);
    if (!(await container.isExisting()) || !(await container.isDisplayed())) {
        const screenshotName = `Action-Container-Not-Visible-${Date.now()}`;
        await browser.saveScreenshot(`./ScreenShots/${screenshotName}.png`);
        throw new Error(
            `[Action:${actionName}] Container '${containerSelector}' not visible`
        );
    }

    // ---- FIRST ATTEMPT ----
    try {
        await attemptClick('initial');
    } catch (err) {
        console.warn(
            `[Action:${actionName}] Button not clickable. Refreshing page and retrying once...`
        );

        const screenshotName = `Action-${actionName}-Before-Refresh-${Date.now()}`;
        await browser.saveScreenshot(`./ScreenShots/${screenshotName}.png`);

        // Refresh + re-stabilize
        await browser.refresh();
        await waitForAppReady({ context: `RefreshRetry-${actionName}` });
        await pause(mediumPause);

        // ---- SECOND (FINAL) ATTEMPT ----
        try {
            await attemptClick('after-refresh');
        } catch (finalErr) {
            const finalShot = `Action-${actionName}-FAILED-${Date.now()}`;
            await browser.saveScreenshot(`./ScreenShots/${finalShot}.png`);

            throw new Error(
                `[Action:${actionName}] Failed after refresh retry.\n` +
                `Initial error: ${err.message}\n` +
                `Final error: ${finalErr.message}\n` +
                `Screenshot: ${finalShot}`
            );
        }
    }

    // ---- SAVE confirmation handling (unchanged) ----
    if (actionName.toLowerCase() === 'save') {
        await pause(mediumPause);

        const popupHeaderSelector = "//h2[normalize-space()='Description Not Added']";
        const checkboxSelector = "#dontShowAgain";
        const saveAnywayButtonSelector = "#saveAnyway";

        if (await $(popupHeaderSelector).isExisting()) {
            const checkbox = await $(checkboxSelector);
            if (await checkbox.isDisplayed()) {
                await checkbox.click();
            }

            const saveButton = await $(saveAnywayButtonSelector);
            await saveButton.waitForDisplayed({ timeout: hugePause });
            await saveButton.click();
        }
    }
};
