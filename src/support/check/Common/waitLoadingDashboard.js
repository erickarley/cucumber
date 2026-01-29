import pause from '../../action/pause';
import { mediumPause, bigPause } from '../../constants';

/**
 * Waits for dashboard widgets and data (including reports) to fully render
 */
export default async () => {
    // Step 1: Check for report widgets
    const reportWidgetSelector = "//div[@ng-show='reportController.graphIsLoading()']";
    const reportWidgets = await $$(reportWidgetSelector);

    if (reportWidgets.length > 0) {
        console.log(`📊 Found ${reportWidgets.length} report widget(s) loading.`);

        for (let i = 0; i < reportWidgets.length; i++) {
            let attempts = 0;
            const widget = reportWidgets[i];

            while (await widget.getAttribute('aria-hidden') !== 'true' && attempts < 20) {
                console.log(`⏳ Waiting for report widget [${i + 1}] to finish loading...`);
                await pause(mediumPause);
                attempts++;
            }

            if (await widget.getAttribute('aria-hidden') !== 'true') {
                console.warn(`⚠️ Report widget [${i + 1}] may not have finished loading.`);
            } else {
                console.log(`✅ Report widget [${i + 1}] finished loading.`);
            }
        }
    } else {
        console.log('📋 No report widgets detected. Falling back to general overlay checks...');
        
        const loadingOverlays = [
            "//div[@flag='controller.isLoading'][@style='display: flex;']",
            "//div[@class='k-loading-mask']",
            "//div[@ng-show='progress.show'][@aria-hidden='false']"
        ];

        for (const selector of loadingOverlays) {
            let stillLoading = true;
            while (stillLoading) {
                const element = await $(selector);
                if (await element.isDisplayed()) {
                    console.log(`⏳ Waiting for ${selector}`);
                    await pause(mediumPause);
                } else {
                    stillLoading = false;
                }
            }
        }
    }

    console.log("✅ Dashboard widgets appear ready.");
};
