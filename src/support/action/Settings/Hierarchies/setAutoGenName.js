import setInputField from '../../setInputField';
import waitForDisplayed from '../../waitForDisplayed';
import { smallPause } from '../../../constants';
import clickElement from '../../clickElement';
import pause from '../../pause';

/**
 * Set the name for the hierarchy
 * @param  {String}   hierarchyAGName      The name of the auto generated hierarchy
 * @param  {String}   dataSetOption        The data set option name
 */
export default async(hierarchyAGName, dataSetOption) => {
    /**
     * Selector for the field
     * @type {String}
     */
    const fieldSelector = "//input[@ng-model='autoHierarchyController.autoHierarchyBuilderModel.hierarchyName']";

    /**
     * Selector for the field
     * @type {String}
     */
    const dropDownSelector = "//md-select";

    /**
     * Selector for the field
     * @type {String}
     */
    const dataSetOptionSelector = "//md-option[contains(.,'" + dataSetOption +"')]";
    
    await waitForDisplayed(fieldSelector);
    await setInputField('set', hierarchyAGName, fieldSelector);
    await clickElement('click','element',dropDownSelector);
    await pause(1000);
    await waitForDisplayed(dataSetOptionSelector);
    //waitFor(dataSetOptionSelector, longPause, null, 'enabled');
    await clickElement('click','element',dataSetOptionSelector);
    await pause(smallPause);
};