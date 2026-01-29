import pause from "../../action/pause";
import { mediumPause } from "../../constants";

/**
 * Verifies if the Task Manager dialog is open or closed
 * @param {string} expectedState 'open' or 'closed'
 */
export default async (expectedState) => {
    const taskManagerSelector = "//md-dialog[@id='backgroundTaskManagerDialog']";
    const shouldBeOpen = expectedState === 'open';
    const dialogElement = await $(taskManagerSelector);
    const exists = await dialogElement.isExisting();
    await pause(mediumPause);
    if (!exists) {
        expect(expectedState).toBe('closed', `❌ Expected Task Manager to be ${expectedState}, but it did not exist in the DOM.`);
        return;
    }

    const isDisplayed = await dialogElement.isDisplayed();

    if (shouldBeOpen) {
        expect(isDisplayed).toBe(true, `❌ Expected Task Manager to be open, but it was not visible.`);
    } else {
        expect(isDisplayed).toBe(false, `❌ Expected Task Manager to be closed, but it was still visible.`);
    }

    // console.log(`✅ Task Manager is ${expectedState} as expected.`);
};
