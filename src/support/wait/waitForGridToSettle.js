
export default async function waitForGridToSettle(timeout = 60000) {

    const selectors = {
        container: "//div[contains(@class,'k-grid')]",
        rows: "//tr[contains(@class,'k-master-row')]",
        noResults: "//*[contains(text(),'No results') or contains(text(),'Results: 0')]",
        header: "//div[contains(@class,'k-grid-header')]",
        loadingMask: "//div[contains(@class,'k-loading-mask')]",
        deferred: "//*[contains(text(), \"We’re loading your content\")]"
    };

    return browser.waitUntil(async () => {

        // 1. Loading mask = not ready
        const mask = await $$(selectors.loadingMask);
        if (mask.length && await mask[0].isDisplayed()) return false;

        // 2. Deferred banner = not ready
        const deferred = await $$(selectors.deferred);
        if (deferred.length && await deferred[0].isDisplayed()) return false;

        // 3. Rows present = ready
        const rows = await $$(selectors.rows);
        if (rows.length > 0) return true;

        // 4. No results = ready (final empty state)
        const emptyMsg = await $$(selectors.noResults);
        if (emptyMsg.length > 0) return true;

        // 5. Header exists = grid fully rendered but empty
        const header = await $$(selectors.header);
        if (header.length > 0) return true;

        // 6. Container exists but nothing else → still warming up
        const container = await $$(selectors.container);
        if (container.length > 0) return false;

        return false;

    }, {
        timeout,
        interval: 300,
        timeoutMsg: "[GridSettle] Grid did not reach a final state."
    });
}
