import clickElement from '../clickElement';
import mapper from  './queryMap';
import {  smallPause } from '../../constants';
import pause from '../pause';
/**
 * Clicks a button on 2020
 * @param  {String}   elementType       Input text
 * @param  {String}   elementValue       Input text
 */

export default async (_elementType,elementValue) => {
    /**
     * Selector for the button
     * @type {String}
     * @type {String}
     */
    // console.log(elementValue);
    let elementSelector =  mapper(elementValue);
    // console.log(elementSelector);

    let elementToFind = await $$(elementSelector);
    // console.log("length: " + elementToFind.length);
    // console.log(elementToFind);
    if (elementToFind.length == 0) {
        if (elementValue == 'Filter Event Count') {
            elementSelector = "//ag-removable-noun-list[@class='group-by']/following-sibling::ag-removable-noun-filter//ag-md-icon[@class='not-filtering']"
            elementToFind = await $$(elementSelector);
            // console.log('Filter Event Count');
        }
        else if (elementValue == 'Filter Distinct Count') {
            elementSelector = "//ag-removable-noun-list[@class='distinct']/following-sibling::ag-removable-noun-filter//ag-md-icon[@class='not-filtering']";
            elementToFind = await $$(elementSelector);
            // console.log('Filter Distinct Count');
        }
        // console.log(elementToFind.length);
    }

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
