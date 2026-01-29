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
    const initialGraphSelectorDD = '//*[@id="graphable-columns-grid-container"]/md-list-item[1]/div/div[1]/div/button/span';

    /**
     * Partial Selector for the drop down option
     * @type {String}
     */
    const initialGraphOptionSelector = await $$(initialGraphSelectorDD)

    let text: string = await initialGraphOptionSelector[0].getText();
    text = text.trim();
    if (text.toUpperCase() != measureIndicator.toUpperCase()) {
        throw Error("First initial graph option is not equal to '" + measureIndicator +"'");
    }
};