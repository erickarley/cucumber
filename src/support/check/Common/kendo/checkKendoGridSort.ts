import checkIfElementExists from '../../../lib/checkIfElementExists';

/**
 * Verifies that the Kendo grid column is sorted in the given order.
 * @param {'ascending' | 'descending'} order - Expected sort order
 * @param {string} fieldName - Data field bound to the column (e.g., "Hierarchy")
 */
export default async (order: 'ascending' | 'descending', fieldName: string) => {
    const selector = `.k-grid-content table td span[ng-bind="dataItem.${fieldName}"]`;

    await checkIfElementExists(selector);

    // Wait until values stabilize in sorted order
    await browser.waitUntil(async () => {
        const elements = await $$(selector);
        if (elements.length <= 1) return false;

        const textValues: string[] = [];
        for (const el of elements) {
            const text = (await el.getText()).toLocaleLowerCase().trim();
            if (text) textValues.push(text);
        }

        const sorted = [...textValues].sort();
        if (order === 'descending') sorted.reverse();

        return textValues.join() === sorted.join();
    }, {
        timeout: 10000,
        interval: 500,
        timeoutMsg: `[Sort Check] Grid did not appear sorted in '${order}' order for field "${fieldName}".`
    });

    // console.log(`[Sort Check] ✅ Grid is sorted in '${order}' order for field "${fieldName}".`);
};
