import isExisting from '../isExisting';
import waitForDisplayed from '../../action/waitForDisplayed';
import pause from '../../action/pause';
import { mediumPause, smallPause } from '../../constants';

/**
 * Gets a value from the X row based on the name of the header
 * @param  {Number}     rowNumber           Row to grab info from
 * @param  {String}     textOnTableHeader   Header to search for
 * @param  {String}     category            Category of the filter
 */
export default async(rowNumber, textOnTableHeader, category) => {

    let keyName = textOnTableHeader + '-' + rowNumber + '-';
    let valueFromStorage = browser.sharedStore.get(keyName);

    if (textOnTableHeader == 'Original Receipt Date') {
        valueFromStorage = valueFromStorage.replace(/\//g,'-');
        // console.log(valueFromStorage);
    }
    else if (textOnTableHeader == 'Credit Card Exp. Date') {
        valueFromStorage = valueFromStorage.substring(0,2) + '/' + valueFromStorage.substring(2);
        // console.log(valueFromStorage);
    }
    
    await waitForDisplayed('//*[@class[contains(.,"receipt-line")]]');
    /**
     * The expected text selector
     * @type {String}
     */
    const textOnReceiptSelector = "//span[@class[contains(.,'line')]][contains(.,'"+ valueFromStorage + "')]";

    const textToLookOnDetailView = await $$(textOnReceiptSelector);
    let isAvailable = false;
    textToLookOnDetailView.forEach(isTextAvailable);

    function isTextAvailable(item, index, arr) {
        // console.log(arr[index].getText());
        if (arr[index].getText().indexOf(valueFromStorage) != -1) {
            isAvailable = true;
        }
    }

    if (isAvailable == false) {
        let screenshotName = category + '-' + textOnTableHeader + '-' + 'ERROR-Text-From-Row-' + rowNumber + '-Value-' + valueFromStorage + '-NOT-FOUND-ON-DETAILVIEW'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
    else {
        await waitForDisplayed(textOnReceiptSelector);
        await isExisting(textOnReceiptSelector,false);
        await pause(smallPause);
    };
};
