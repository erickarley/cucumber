import clickElement from '../../clickElement';
import pause from '../../pause';
import setInputField from '../../setInputField';

/**
 * aggregationLevel to Click
 * @param  {String}   aggregationLevel The aggregationLevel to choose
 */
export default async(aggregationLevel, aggregationLevel2) => {
    /**
     * Selector for the hierarchyType 
     * @type {String}
     */
    const hierarchyDDSelector = "//md-select[@ng-model='aggregationLevel.masterDataColumn']";

    /**
     * Selector for the option 
     * @type {String}
     */
     const hierarchyDDOptionSelector = "//md-option[contains(.,'" + aggregationLevel+ "')]";

    /**
     * Selector for the create new button 
     * @type {String}
     */
    const createNewButton = "//ag-create-new[@buttons='actionBarCtrl.createButtons']/button";

    await clickElement('click','element',hierarchyDDSelector);
    await pause(2000);
    await clickElement('click','element',hierarchyDDOptionSelector);
    await pause(1000); 
    await setInputField('set', aggregationLevel, "//div[2]/div/div[2]/md-input-container/input");
}
