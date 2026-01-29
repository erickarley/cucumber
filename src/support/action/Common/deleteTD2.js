import clickElement from '../clickElement';
import checkLoadingOverlay from '../../check/Common/checkLoadingOverlay';
import pause from '../pause';
import clickButton from '../Common/clickButton';
import { bigPause, mediumPause } from '../../constants';
import waitLoadingGif from '../../check/Common/waitLoadingGif';

/**
 * Item to click
 * @param {String}      itemName     Item to click
 */

export default async(itemName) => {
    /**
     * Base for the Selector
     * @type {String}
     */
    const itemNameSelectorBase = "//td[3]/span";
    
    /**
     * Selector for the item to delete
     * @type {String}
     */
    const itemNameSelector = "//td[3]/span[contains(.,'" + itemName +"')]";

    let listOfitemsToDelete = await $$(itemNameSelector);

    let numberOfitemsToDelete = listOfitemsToDelete.length;

    console.log('Number of items to delete:' + numberOfitemsToDelete);

    let itemsToString = [];

    for (let i = 0; i < numberOfitemsToDelete; i++) {
        itemsToString.push(await listOfitemsToDelete[i].getText());
    }

    for(var i = numberOfitemsToDelete - 1; i >= 0; i--) {
        console.log("item to delete: " + i + "-" + itemsToString[i]);
        await waitLoadingGif(true);
        await clickElement('click', 'element', itemNameSelectorBase + "[.='" + itemsToString[i] +"']/ancestor::tr/td[2]//button");
        await pause(mediumPause);
        await clickButton('Continue');
        await pause(mediumPause);
        await checkLoadingOverlay(true);   
    }
};