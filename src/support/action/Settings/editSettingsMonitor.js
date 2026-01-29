import clickElement from '../clickElement';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { longPause } from '../../constants';

/**
 * item Name to select
 * @param {String}      itemName     The item to select
 */

export default async(itemName) => {
    /**
     * Selector for the button
     * @type {String}
     */
    // const itemsToEdit = "//td[3]/span";
    const itemsToEdit = "//td[4]/span";

    let listOfItems = await $$(itemsToEdit);
    let isAvailable = false;

    for(let i=0; i < listOfItems.length; i++) {
        if ((await listOfItems[i].getText()) == itemName) {
            isAvailable = true;
        }
    }
    // listOfItems.forEach(isOptionAvailable);

    // function isOptionAvailable(item, index, arr) {
    //     //console.log(arr[index].getText());
    //     if ((await arr[index].getText()) == itemName) {
    //         isAvailable = true;
    //     }
    // }

    if (isAvailable == true) {

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