import pause from '../pause';


/**
 * Selects a queryToMeasure
 * @param  {String}   measureIndicator    The name of the indicator to select
 */
export default async(measureIndicator: string) => {
    /**
     * Selector for the Report type drop down
     * @type {String}
     */
    const initialSortSelectorDD = '//ng-form[@name="addableDropDownForm"]/div/div/md-select/md-select-value[1]/span/div';

    /**
     * Partial Selector for the drop down option
     * @type {String}
     */
    const initialSortOptionSelector = await $$(initialSortSelectorDD)

    let text: string = await initialSortOptionSelector[0].getText();
    text = text.trim();
    if (text != measureIndicator) {
        throw Error("First initial sort option is not equal to '" + measureIndicator +"'");
    }
};