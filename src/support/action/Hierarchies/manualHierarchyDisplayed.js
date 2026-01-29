import { extraHugePause } from "../../constants";
import isVisible from '../../check/isDisplayed';
import checkAvailability from '../../check/Common/checkAvailability';
import clickElement from '../../action/clickElement'

export default async () => {

    const dialog = await $("#hierarchyTab");

    if (!(await dialog.isDisplayed())) {
        await clickElement('click', 'element','#sidebar-settings'); // Click on Settings
        
        await checkAvailability(); //Waits the page is properly rendered
        
        await isVisible('#hierarchy-create',false); //Checks if Setting page with "Manage Hierarchies" is deplayed

        await clickElement('click', 'button','#hierarchy-create-dialog'); // click in Create button (displays two options: Manual and Auto Generated)
        
        await checkAvailability(); //Waits the page is properly rendered        
        await isVisible('#create-new-dialog',false); //Checks if "Create New" is deplayed
        
        await isVisible('#create-dialog-hierachy-manual', false); // Checks that the button of Manual Hierarchy is there
        await clickElement('click', 'element','#create-dialog-hierachy-manual'); // Click on Manual Hierarchy
        
        await dialog.waitForExist({ timeout: extraHugePause, reverse: false }); // Waits for Create New Manual Hierarchy dialog.
        await checkAvailability(); //Waits the page is properly rendered        
    }
};
