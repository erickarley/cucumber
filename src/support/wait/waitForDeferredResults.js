import isDeferredLoadingMessageVisible from "./isDeferredLoadingMessageVisible.js";
import waitForTaskManagerJobToComplete from "./waitForTaskManagerJobToComplete.js";
import waitForGridToSettle from "./waitForGridToSettle.js";

/**
 * Ensures results are fully loaded — even when deferred loading is used.
 * Works for Queries, Reports, Snapshots, Metrics, etc.
 *
 * Behavior:
 *  - If page is NOT in deferred mode → simply waits for normal grid settle
 *  - If deferred mode IS active:
 *      1. Wait until Task Manager marks the job as complete
 *      2. Re-load grid when job completes
 *      3. Wait for grid to reach a final (possibly empty) state
 */
export default async function waitForDeferredResults(minExpectedRows = 1) {

    const deferred = await isDeferredLoadingMessageVisible();

    if (!deferred) {
        // Normal synchronous screen — just let grid settle
        await waitForGridToSettle();
        return;
    }

    console.log("[DeferredResults] Deferred loading detected.");

    // 1. Wait for Task Manager async compute job to complete
    await waitForTaskManagerJobToComplete();

    // 2. After completion, the UI refreshes the grid
    //    So we wait again for a stable grid state
    await waitForGridToSettle();
}
