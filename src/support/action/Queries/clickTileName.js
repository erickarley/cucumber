import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import { bigPause } from '../../constants';

/**
 * Tile name to Click
 * @param  {String}   tileName The tile to choose
 */
export default async (tileName) => {
    const tileNameSelector = `//h3[normalize-space(text())='${tileName}']`;

    try {
        // console.log(`[Tile Click] Looking for tile: "${tileName}"`);

        await browser.waitUntil(
            async () => {
                const el = await $(tileNameSelector);
                return await el.isExisting() && await el.isDisplayed();
            },
            {
                timeout: bigPause,
                timeoutMsg: `[Tile Click] Tile "${tileName}" did not appear or was not visible within timeout.`,
            }
        );

        // console.log(`[Tile Click] ✅ Tile "${tileName}" is visible, proceeding to click.`);
        await clickElement('click', 'element', tileNameSelector);
    } catch (error) {
        const screenshotPath = `./ScreenShots/TileClick-${tileName.replace(/\s+/g, '-')}-${Date.now()}.png`;
        await browser.saveScreenshot(screenshotPath);
        console.error(`[Tile Click] ❌ Error clicking on tile "${tileName}". Screenshot saved: ${screenshotPath}`);
        throw error;
    }
};
