import clickElement from '../../../clickElement';
import setInputField from '../../../setInputField';
import manualHierarchyDisplayed from '../../../Hierarchies/manualHierarchyDisplayed';
import checkBreadCrumb from '../../../../check/Settings/checkBreadCrumb';
import setHierarchyField from '../../../Hierarchies/setHierarchyField';

/**
 * aggregationLevel to Click
 * @param  {String}   aggregationLevel The aggregationLevel to choose
 */
export default async(aggregationLevel) => {

    await manualHierarchyDisplayed();
    await checkBreadCrumb("Name your hierarchy");
    await setHierarchyField("input", "Name", "Automation-Hierarchy Aggregation level")

    const aggregationLevelSelector = "//*[@id='levelContent']//div[@class='nodeName']";
    const aggregationLevelInputField = "//*[@id='editNodeName']";
    const addAggregationLevel = "//*[@id='renameNodeDialog']//input[@type='image'][@alt='OK']";
    
    await clickElement('click', 'element', aggregationLevelSelector);
    await setInputField('set', aggregationLevel, aggregationLevelInputField);
    await clickElement('click', 'element', addAggregationLevel);        
}
