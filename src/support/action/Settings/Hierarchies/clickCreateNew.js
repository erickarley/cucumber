import clickElement from '../../clickElement';
import waitForDisplayed from '../../waitForDisplayed';
import waitFor from '../../waitFor';
import { longPause } from '../../../constants';

/**
 * hierarchyType to Click
 * @param  {String}   hierarchyTypeName The hierarchyType to choose
 */
export default async(hierarchyTypeName) => {
    /**
     * Selector for the hierarchyType 
     * @type {String}
     */
    const hierarchyTypeSelector = "//a[contains(.,'" + hierarchyTypeName +"')]";

    /**
     * Selector for the create new button 
     * @type {String}
     */
    const createNewButton = "//ag-create-new[@buttons='actionBarCtrl.createButtons']/button";

    await waitForDisplayed(createNewButton);
    await clickElement('click','button',createNewButton);

    await waitForDisplayed(hierarchyTypeSelector);
    await waitFor(hierarchyTypeSelector,longPause, null, 'enabled');
    await clickElement('click','element',hierarchyTypeSelector);
}
