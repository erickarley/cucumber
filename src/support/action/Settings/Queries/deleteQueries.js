import clickElement from '../../clickElement';
import checkOverlay from '../../../check/Common/checkOverlay';
import checkLoadingOverlay from '../../../check/Common/checkLoadingOverlay';
import pause from '../../pause';
import clickButton from '../../Common/clickButton';
import { bigPause, mediumPause } from '../../../constants';
import checkBreadCrumb from '../../../check/Settings/checkBreadCrumb';
import waitLoadingGif from '../../../check/Common/waitLoadingGif';
import checkAvailability from '../../../check/Common/checkAvailability';

/**
 * Item to click
 * @param {String}      queryName     Item to click
 */

export default async(queryName) => {
    /**
     * Base for the Selector
     * @type {String}
     */
    const queryNameSelectorBase = "//td[3]/span";
    
    /**
     * Selector for the query to delete
     * @type {String}
     */
    const queryNameSelector = "//td[3]/span[contains(.,'" + queryName +"')]";
    await checkAvailability();

    let listOfQueriesToDelete = await $$(queryNameSelector);
    let numberOfQueriesToDelete = listOfQueriesToDelete.length;
    console.log('Number of queries to delete:' + numberOfQueriesToDelete);
    let queriesToString = [];

    for (let i = 0; i < numberOfQueriesToDelete; i++) {
        queriesToString.push(await listOfQueriesToDelete[i].getText());
    }

    for(var i = numberOfQueriesToDelete - 1; i >= 0; i--) {
        console.log("Query to delete: " + i + "-" + queriesToString[i]);
        await checkBreadCrumb("Manage Queries");
        await checkAvailability();
        await clickElement('click', 'element', queryNameSelectorBase + "[.='" + queriesToString[i] +"']/ancestor::tr/td[2]//button");
        await clickButton('Continue');
        console.log('Pending to delete: ' + i);
        await checkAvailability();

        
    };

};