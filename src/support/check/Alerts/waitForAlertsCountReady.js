// import pause from '../pause';

import pause from "../../action/pause";

export default async function waitForAlertCountsReady() {
    const selector = "//div[contains(@class,'alertCount')]";

    const MAX_RETRIES = 20;
    const RETRY_DELAY = 300;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        const elements = await $$(selector);

        if (elements.length > 0) {
            const values = await Promise.all(
                elements.map(async el => (await el.getText()).trim())
            );

            const unresolved = values.filter(v => v === '--');

            if (unresolved.length === 0) {
                // console.log(`[Alerts] Counts resolved: ${values.join(', ')}`);
                return;
            }

            // console.log(`[Alerts] Waiting for counts... ${values.join(', ')}`);
        }

        await pause(RETRY_DELAY);
    }

    throw new Error('[Alerts] Alert counts did not resolve (still "--")');
}
