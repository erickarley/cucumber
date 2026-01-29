import clickElement from '../clickElement';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { longPause } from '../../constants';
import checkLoadingOverlay from '../../check/Common/checkLoadingOverlay';
import waitLoadingGif from '../../check/Common/waitLoadingGif';

/**
 * item Name to select
 * @param {String}      itemName     The item to select
 */

export default async(itemName) => {
    
    await checkLoadingOverlay(true);
    await waitLoadingGif(true);
    /**
     * Selector for the button
     * @type {String}
     */
    const itemsToEdit = "//td[3]/span[.='" + itemName + "']";

    let listOfItems = await $$(itemsToEdit);
    // let isAvailable = false;
    // const isAvailable = listOfItems.toString();
    // console.log(listOfItems);
    // listOfItems.forEach(isOptionAvailable);
    // function isOptionAvailable(item, index, arr) {
    //     //console.log(arr[index].getText());
    //     if (arr[index].getText() == itemName) {
    //         isAvailable = true;
    //     }
    // }

    if (listOfItems.length > 0) {

        /**
         * Selector for the button
         * @type {String}
         */
        const settingsItemEditButton = "//span[.='"+ itemName +"']/ancestor::tr//a";

        await waitForDisplayed(settingsItemEditButton);
        await waitFor(settingsItemEditButton,longPause,null,'enabled');
        //checkIfElementExists(settingsItemEditButton);
        await clickElement('click','element',settingsItemEditButton);
    }
    else {
        let screenshotName = 'Item-To-Edit-' + itemName + '-NOT-EXISTS'; 
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);

    }
}