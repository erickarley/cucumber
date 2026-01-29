import setInputfield from '../setInputField';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';
import clickCreateNew from '../Settings/Hierarchies/clickCreateNew';
import setAutoGenName from '../Settings/Hierarchies/setAutoGenName';
import clickButton from '../Common/clickButton';
import checkAvailability from '../../check/Common/checkAvailability';
import checkBanner from '../../check/Queries/checkBanner';
import pause from '../pause';
import { bigPause, longPause } from '../../constants';
import openTaskManager from '../Common/openTaskManager';
// import checkTaskManagerMessage from '../../check/Queries/checkTaskManagerMessage';
import selectDashboardAction from '../Dashboards/selectDashboardAction';
import checkTaskStatusMessage from '../../check/Common/checkTaskStatusMessage';

/**
 * Creates a hierachy (Auto Generated|Manual) for the name and dataset of hierarchy 
 * @param  {string}   hierarchyType      The type of the hierarchy
 * @param  {string}   hierarchyName      The name of the hierarchy 
 * @param  {string}   dataSet            The dataset of the hierarchy
 */
export default async(hierarchyType, hierarchyName, dataSet) => {
    /**
     * Selector for the name
     * @type {String}
     */
    const fieldSelector = "//td/span[contains(.,'" + hierarchyName + "')]";

    let elementToFind = await $$(fieldSelector);

    if (elementToFind.length == 0) {
        await clickCreateNew(hierarchyType + " Hierarchy");
        await checkAvailability();
        await setAutoGenName(hierarchyName, dataSet);
        await clickButton("Add");
        await checkAvailability();
        await clickButton("Add");
        await checkAvailability();
        await clickButton("Add");
        await checkAvailability();
        await selectDashboardAction("Save");
        await checkBanner("Hierarchy Saved.");
        await pause(bigPause);
        await openTaskManager();
        await pause(longPause);
        const taskManagerVersionIdentifier = "//div[@class='sectionHeader']/div[contains(.,'In Progress (')]"
        let versionSwitch = await $$(taskManagerVersionIdentifier);
        let messageToCheck;
        if (versionSwitch == 0) { 
            messageToCheck = "Hierarchy has been created.";
        }
        else {
            messageToCheck = "[Auto Hierarchy Generation] Hierarchy generation for " + hierarchyName;
        }

        await checkTaskStatusMessage(null, messageToCheck);
    }
    else {
        console.log('hierarchy with name ' + hierarchyName + ' exists.');
    }
};