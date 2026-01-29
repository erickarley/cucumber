import pause from '../../action/pause';
import { bigPause } from '../../constants';

/**
 * Smart Task Manager message verification with UI compatibility.
 * - Supports both old and new Task Manager UIs.
 * - Waits up to 10 seconds for message to appear.
 * - If not found, clicks Retry (via JS) and checks again.
 *
 * @param {String} falsecase - Whether to negate the check
 * @param {String} expectedMessage - The message to look for
 */
export default async (falsecase, expectedMessage) => {
    const taskManagerVersionIdentifier = "//div[@class='sectionHeader']/div[contains(.,'In Progress (')]";
    const versionSwitch = await $$(taskManagerVersionIdentifier);

    let messageSelector;
    if (versionSwitch.length === 0) {
        // Old UI
        messageSelector = `//div[.='Today']/ancestor-or-self::background-task-manager-task/div/div[@class='detailWrapper']/div[.='${expectedMessage}']`;
    } else {
        // New UI
        messageSelector = `//div[@class='taskRow']/div/div[@class[contains(.,'name')]][contains(.,'${expectedMessage}')]`;
    }

    const retryButtonSelector = `button[ng-click="backgroundTaskManagerTaskController.retry()"]`;

    // 🔄 Wait up to 10s for the message to appear
    const messageAppeared = await browser.waitUntil(
        async () => {
            const el = await $(messageSelector);
            return await el.isExisting();
        },
        {
            timeout: 10000,
            interval: 500,
            timeoutMsg: `[Task Manager] Message "${expectedMessage}" not found within 10s.`,
        }
    ).catch(() => false); // suppress failure for now

    // ❌ NOT case (negated assertion)
    if (falsecase === ' not') {
        if (messageAppeared) {
            throw new Error(`[Task Manager] ❌ Expected NOT to find message "${expectedMessage}", but it was found.`);
        } else {
            // console.log(`[Task Manager] ✅ Message "${expectedMessage}" correctly not found.`);
            return;
        }
    }

    // ✅ Message found without retry
    if (messageAppeared) {
        // console.log(`[Task Manager] ✅ Message "${expectedMessage}" appeared within wait period.`);
        return;
    }

    // 🔁 Retry logic
    const retryExists = await $(retryButtonSelector).isExisting();
    if (retryExists) {
        console.warn(`[Task Manager] ⚠️ Message not found. Attempting Retry via JS...`);
        await browser.execute((selector) => {
            const el = document.querySelector(selector);
            if (el) {
                el.focus();
                el.click();
            }
        }, retryButtonSelector);
        await pause(3000); // wait for retry
    } else {
        console.warn(`[Task Manager] ⚠️ Retry button not found.`);
    }

    // ♻ Final check after retry
    const retryMessage = await $(messageSelector);
    if (await retryMessage.isExisting()) {
        // console.log(`[Task Manager] ✅ Message "${expectedMessage}" appeared after Retry.`);
    } else {
        const screenshotName = `TaskManager-Message-Not-Found-${expectedMessage.replace(/\s+/g, '-')}-${Date.now()}.png`;
        await browser.saveScreenshot(`./ScreenShots/${screenshotName}`);
        throw new Error(`[Task Manager] ❌ Message "${expectedMessage}" not found even after Retry. Screenshot: ${screenshotName}`);
    }
};
