import pause from '../pause';
import clickElement from '../clickElement';

/**
 * Selects a queryToMeasure
 * @param  {String}   measureIndicator    The name of the indicator to select
 */
export default async(measureIndicator) => {
    /**
     * Selector for the Report type drop down
     * @type {String}
     */
    const initialSortSelectorDD = "//md-select[@ng-model='selection.identifier']";

    /**
     * Partial Selector for the drop down option
     * @type {String}
     */
    const initialSortOptionSelector = "//md-option[contains(.,'" + measureIndicator + "')]";

    await clickElement('click', 'button', "//button[.='Add']");
    await pause(1000);
    await clickElement('click', 'element', initialSortSelectorDD);
    await pause(1000);
    await clickElement('click', 'element', initialSortOptionSelector);
};