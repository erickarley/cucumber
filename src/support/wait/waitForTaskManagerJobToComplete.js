
/**
 * Waits until the active async job (Summation, Query Compute, Export, Snapshot)
 * disappears from the Task Manager list.
 *
 */
export default async function waitForTaskManagerJobToComplete(timeout = 120000) {

    const dialogSelector = "//md-dialog[@id='backgroundTaskManagerDialog']";
    const jobRowSelector = "//md-dialog//div[contains(@class,'task-row')]";

    // Click the Task Manager icon if visible
    try {
        const btn = await $("#taskManagerBtn");
        if (await btn.isDisplayed()) await btn.click();
    } catch {}

    return browser.waitUntil(
        async () => {
            // Check dialog presence
            const dialog = await $(dialogSelector);
            if (!(await dialog.isExisting())) return false;

            // Find job rows
            const rows = await $$(jobRowSelector);

            // If no rows → job is complete
            if (rows.length === 0) return true;

            // If rows exist, but they're not visible → treat as complete
            let anyVisible = false;
            for (const r of rows) {
                try {
                    if (await r.isDisplayed()) {
                        anyVisible = true;
                        break;
                    }
                } catch {}
            }

            return !anyVisible;
        },
        {
            timeout,
            interval: 400,
            timeoutMsg: "[TaskManager] Job did not complete before timeout."
        }
    ).finally(async () => {
        // Close dialog if still open
        try {
            const closeBtn = await $("button[ng-click*='close']");
            if (await closeBtn.isDisplayed()) await closeBtn.click();
        } catch {}
    });
}
