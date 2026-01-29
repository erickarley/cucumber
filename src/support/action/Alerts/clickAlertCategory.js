import waitForAlertCountsReady from '../../check/Alerts/waitForAlertsCountReady';
import clickElement from '../clickElement';
import pause from '../pause';

export default async function clickAlertCategory(categoryName) {

    if (!categoryName || typeof categoryName !== 'string') {
        throw new Error(`[CategoryClick] Invalid category: ${categoryName}`);
    }

    const selector = `//div[contains(@class,'filterButtons')]//button[contains(@class,'alertFilter')]//div[@class='alertCountLabel' and normalize-space(text())='${categoryName}']/..`;

    await waitForAlertCountsReady();

    const MAX_RETRIES = 8;
    const RETRY_DELAY = 500;

    const filterBarSelector = "//div[contains(@class,'filterButtons')]";
    await browser.waitUntil(
        async () => (await $$(filterBarSelector)).length > 0,
        {
            timeout: 10000,
            interval: 300,
            timeoutMsg: `[CategoryClick] Filter bar did not render`
        }
    );

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {

        const elements = await $$(selector);

        if (elements.length === 0) {
            await pause(RETRY_DELAY);
            continue;
        }

        const element = elements[0];

        try {
            if (!(await element.isDisplayed()) || !(await element.isClickable())) {
                await pause(RETRY_DELAY);
                continue;
            }

            await element.scrollIntoView({ block: 'center' });
            await pause(100);

            await clickElement('click', 'element', selector);
            return;

        } catch {
            await pause(RETRY_DELAY);
        }
    }

    throw new Error(`[CategoryClick] Could not click "${categoryName}" after ${MAX_RETRIES} retries.`);
}
