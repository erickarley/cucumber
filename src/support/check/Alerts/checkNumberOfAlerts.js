import waitForDisplayed from '../../action/waitForDisplayed';

/**
 * Waits until the alert count becomes a valid number (not "--")
 * @param {string} selector - The XPath selector for the alert count element
 * @param {string} label - Label used for logging and error messages
 * @returns {Promise<number>} - Numeric value of the alert count
 */
const waitForNumericAlertCount = async (selector, label) => {
    let value = '--';
    await browser.waitUntil(
        async () => {
            value = await $(selector).getText();
            return !isNaN(Number(value));
        },
        {
            timeout: 10000,
            interval: 250,
            timeoutMsg: `[Alert Check] Timeout waiting for numeric value for "${label}". Last value was: "${value}"`
        }
    );
    return Number(value);
};

/**
 * Checks the number of alerts against the value in memory for the chosen type of alert
 * @param  {String} typeOfAlert  - "Open" or "Closed"
 * @param  {String} changeType   - "increased", "decreased", or "not changed"
 */
export default async (typeOfAlert, changeType) => {
    await browser.refresh();
    const selector = `//div[@class='alertCountLabel'][.='${typeOfAlert}']/preceding-sibling::div[@class='alertCount']`;

    await waitForDisplayed(selector);
    const current = await waitForNumericAlertCount(selector, `${typeOfAlert} Alerts`);
    const previousValue = await browser.sharedStore.get('numberOfAlerts');
    const previous = Number(previousValue);

    if (isNaN(previous)) {
        throw new Error(`[Alert Check] Stored previous value is not a number: "${previousValue}"`);
    }

    // console.log(`[Alert Check] ${typeOfAlert} Alerts — Before: ${previous}, After: ${current}`);

    switch (changeType) {
        case 'increased':
            expect(current).toBeGreaterThan(previous);
            break;
        case 'decreased':
            expect(current).toBeLessThan(previous);
            break;
        case 'not changed':
            expect(current).toEqual(previous);
            break;
        default:
            throw new Error(`[Alert Check] Invalid changeType "${changeType}" — must be increased, decreased, or not changed.`);
    }

    // console.log(`[Alert Check] Alert count "${typeOfAlert}" ${changeType} as expected.`);
};
