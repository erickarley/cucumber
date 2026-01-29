import isExisting from '../isExisting';

/**
 * Check for a Tab 
 * @param  {String}     actionButtonName The name of the button
 * @param  {String}     status           enabled or disabled 
 */
export default async(actionButtonName, status) => {
    /**
     * The selector for the button
     * @type {String}
     */
    const tabSelector = "//button[@title='" + actionButtonName + "']";

    let elementToFind = await $$(tabSelector);

    if (status === 'disabled') {
        await isExisting(tabSelector,true)   
        // isExisting(tabSelector+"[@disabled='disabled']",false)
    } 
    else if (status === 'enabled') {
        await isExisting(tabSelector,false)   
    }
    else {
        let screenshotName = 'Action button -' + actionButtonName + '-DOES NOT EXIST'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }

};
