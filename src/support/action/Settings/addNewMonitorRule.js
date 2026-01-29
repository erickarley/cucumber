import setFilters from '../Common/setFilters';
import select2020DropDown from '../Common/select2020DropDown';
import pause from '../pause';
import clickElement from '../clickElement';
import setInputfield from '../setInputField';
import { smallPause } from '../../constants';
import waitForDisplayed from '../waitForDisplayed';

/**
 * Selects the settings for summation
 * @param  {String}   ruleName          Name config
 * @param  {String}   ruleType          Type selection
 * @param  {String}   operator          Operator selection
 * @param  {Number}   valueForOperator          
 */

export default async(ruleName, ruleType, operator, valueForOperator) => {
    /**Selector for the name
     * @type {String}
     */
     const ruleNameSelector = "#ruleName";

    /**Selector for the type drop down
     * @type {String}
     */
    const ruleTypeSelector = "//md-select[@ng-model='monitorRuleController.currentRule.selectedAggregate']";

    /**Selector for the option type
     * @type {String}
     */
     const ruleOptionTypeSelector = "//md-option[@ng-repeat='aggregate in monitorRuleController.aggregateOptions']/div[contains(.,'" + ruleType +"')]";

    /**Selector for the dimension
     * @type {String}
     */
    const operatorSelector = "//md-select[@ng-model='monitorRuleController.currentRule.selectedOperator']";

    /**
     * Selector for the dimension option
     * @type {String}
     */
    const operatorOptionSelector = "//md-option[@ng-repeat='option in monitorRuleController.operatorOptions'][.='" + operator +"']";

    /**Selector for the name
     * @type {Number}
     */
    const valueFieldSelector = "//input[@type='number']";

    /**Selector for the Add New Rule button
     * @type {String}
     */
     const addNewRuleSelector = "//span[.='Add New Rule']";

    await clickElement('click','element', addNewRuleSelector);
    await pause(smallPause);
    await setInputfield('set',ruleName,ruleNameSelector);

    await waitForDisplayed(ruleTypeSelector);
    await clickElement('click','element',ruleTypeSelector);
    await pause(2000);
    await clickElement('click','element',ruleOptionTypeSelector);
    await pause(1000);

    await select2020DropDown(operatorSelector,operatorOptionSelector,operator);
    await pause(2000);
    await clickElement('click','element', valueFieldSelector);
    await pause(1000);
    await setInputfield('set',valueForOperator,valueFieldSelector);
    await pause(2000);
}
