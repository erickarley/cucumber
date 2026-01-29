import clickElement from '../../clickElement';
import checkOverlay from '../../../check/Common/checkOverlay';
import checkLoadingOverlay from '../../../check/Common/checkLoadingOverlay';
import selectDashboardAction from '../../Dashboards/selectDashboardAction';
import pause from '../../pause';
import clickButton from '../../Common/clickButton';
import { bigPause, mediumPause } from '../../../constants';
import checkBreadCrumb from '../../../check/Settings/checkBreadCrumb';
import checkAvailability from '../../../check/Common/checkAvailability';

/**
 * Item to click
 * @param {String}      measureName     Item to click
 */

export default async(measureName) => {
    /**
     * Base for the Selector
     * @type {String}
     */
    const measureNameSelectorBase = "//td[3]/span";
    
    /**
     * Selector for the measure to delete
     * @type {String}
     */
    const measureNameSelector = "//td[3]/span[contains(.,'" + measureName +"')]";

    let listOfMeasuresToDelete = await $$(measureNameSelector);

    // function iterate(item, index, arr) {
    //     console.log(arr[index].getText());
    // }

    // listOfMeasuresToDelete.forEach(iterate);
    let numberOfMeasuresToDelete = listOfMeasuresToDelete.length;

    console.log('Measure: ' + measureName + ' -  Number of measures to delete:' + numberOfMeasuresToDelete);
    // listOfMeasuresToDelete.forEach(deleteMeasure);

    let measuresToString = [];

    for (let i = 0; i < numberOfMeasuresToDelete; i++) {
        measuresToString.push(await listOfMeasuresToDelete[i].getText());
    }

    for(var i = numberOfMeasuresToDelete - 1; i >= 0; i--) {
        console.log("Measure to delete: " + i + "-" + measuresToString[i]);
        await checkBreadCrumb("Manage Measures");
        await checkAvailability();
        await clickElement('click', 'element', measureNameSelectorBase + "[.='" + measuresToString[i] +"']/ancestor::tr//a");
        await pause(bigPause);
        await checkAvailability();
        await selectDashboardAction('Delete');
        await pause(mediumPause);
        await clickButton('Continue');
        console.log('Pending to delete: ' + i);
        await checkAvailability();
    };

};