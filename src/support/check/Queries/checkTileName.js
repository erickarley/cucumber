import isExisting from '../isExisting';

/**
 * Check if the given string is in the Tile name path
 * @param  {String}   falseCase       Whether to check if the given string is in
 *                                    the Tile name path or not
 * @param  {String}   expectedTileName The string to check for
 */
export default async(expectedTileName, falseCase) => {
    /**
     * The Tile name selector
     * @type {String}
     */
    const tileNameSelector = "//h3[.='" + expectedTileName +"']";

    let elementToFind = await $$(tileNameSelector);

    if (elementToFind.length > 0) {
    //Actions of the step
        await isExisting(tileNameSelector,falseCase);
    }
    else {
        let screenshotName = 'Query-Title-Name-' + expectedTileName + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }    
};
