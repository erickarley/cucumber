import clickElement from '../clickElement';
import mapper from  './reportMap';
import {  smallPause } from '../../constants';
import pause from '../pause';
/**
 * Clicks a button on 2020
 * @param  {String}   elementValue       Input text
 */

export default async (elementValue) => {
    /**
     * Selector for the button
     * @type {String}
     */
     const elementSelector = mapper(elementValue);
    
     let elementToFind = await $$(elementSelector);

    if (elementToFind.length > 0) {
        if (await $(elementSelector).isEnabled()) {
            await clickElement('click','button',elementSelector);
            await pause(smallPause);
        }
        else {
            let screenshotName = 'Button-To-Click' + elementValue + '-NOT-ENABLED'; 
            screenshotName = screenshotName.replace(/\//g,'-');
            await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
            throw Error(screenshotName);
        }
    }
    else {
        let screenshotName = 'Button-To-Click' + elementValue + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
}
