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
 * @param {String}      dashboardName     Item to click
 */

export default async(dashboardName) => {
    /**
     * Base for the Selector
     * @type {String}
     */
    const dashboardNameSelectorBase = "//td[3]/span";
    
    /**
     * Selector for the dashboard to delete
     * @type {String}
     */
    const dashboardNameSelector = "//td[3]/span[contains(.,'" + dashboardName +"')]";
    await checkAvailability();
    let listOfDashboardsToDelete = await $$(dashboardNameSelector);
    let numberOfDashboardsToDelete = listOfDashboardsToDelete.length;
    console.log('Number of dashboards to delete:' + numberOfDashboardsToDelete);
    let dashboardsToString = [];

    for (let i = 0; i < numberOfDashboardsToDelete; i++) {
        dashboardsToString.push(await listOfDashboardsToDelete[i].getText());
    }

    for(var i = numberOfDashboardsToDelete - 1; i >= 0; i--) {
        console.log("Dashboard to delete: " + i + "-" + dashboardsToString[i]);
        await checkBreadCrumb("Manage Dashboards");
        await checkAvailability();
        await clickElement('click', 'element', dashboardNameSelectorBase + "[.='" + dashboardsToString[i] +"']/ancestor::tr/td[2]//button");
        await clickButton('Continue');
        console.log('Pending to delete: ' + i);
        await checkAvailability();
    };
};