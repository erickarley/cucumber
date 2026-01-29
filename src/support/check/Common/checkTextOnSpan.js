import isExisting from '../isExisting';
import { bigPause } from '../../constants';

export default async (falseCase, expectedTextOnSpan) => {
    const selector = `//span[.='${expectedTextOnSpan}']`;
    const timeout = bigPause; // Or customize it

    try {
        if (!falseCase) {
            await browser.waitUntil(
                async () => (await $$(selector)).length > 0,
                {
                    timeout,
                    timeoutMsg: `Span with text '${expectedTextOnSpan}' did not appear in time.`,
                }
            );
        }

        await isExisting(selector, falseCase);
    } catch (e) {
        const screenshotName = `./ScreenShots/Text-To-Check-On-Graph-${expectedTextOnSpan.replace(/\s+/g, '-')}-NOT-EXISTS.png`;
        await browser.saveScreenshot(screenshotName);
        console.error(`[Span Text Check] ERROR: ${e.message}`);
        throw e;
    }
};
