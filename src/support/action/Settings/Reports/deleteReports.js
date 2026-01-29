import clickElement from '../../clickElement';
import clickButton from '../../Common/clickButton';
import checkBreadCrumb from '../../../check/Settings/checkBreadCrumb';
import checkAvailability from '../../../check/Common/checkAvailability';

/**
 * Item to click
 * @param {String}      reportName     Item to click
 */

export default async(reportName) => {
    /**
     * Base for the Selector
     * @type {String}
     */
    const reportNameSelectorBase = "//td[3]/span";
    
    /**
     * Selector for the report to delete
     * @type {String}
     */
    await checkAvailability();
    const reportNameSelector = "//td[3]/span[contains(.,'" + reportName +"')]";
    let listOfReportsToDelete = await $$(reportNameSelector);
    let numberOfReportsToDelete = listOfReportsToDelete.length;
    console.log('Number of reports to delete:' + numberOfReportsToDelete);

    let reportsToString = [];

    for (let i = 0; i < numberOfReportsToDelete; i++) {
        reportsToString.push( await listOfReportsToDelete[i].getText());
    }

    for(var i = numberOfReportsToDelete - 1; i >= 0; i--) {
        console.log("Report to delete: " + i + "-" + reportsToString[i]);
        await checkBreadCrumb("Manage Reports");
        await checkAvailability();
        await clickElement('click', 'element', reportNameSelectorBase + "[.='" + reportsToString[i] +"']/ancestor::tr/td[2]//button");
        await clickButton('Continue');
        console.log('Pending to delete: ' + i);
        await checkAvailability();
    };

};