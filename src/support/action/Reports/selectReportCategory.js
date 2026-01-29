import pause from '../pause';
import clickElement from '../clickElement';

/**
 * Selects a queryToMeasure
 * @param  {String}   reportCategory    The name of the category to select
 */
export default async(reportCategory) => {
    /**
     * Selector for the Report type drop down
     * @type {String}
     */
    const reportCategorySelector = "//h3[@ng-bind='item.displayName || item.name'][.='" + reportCategory + "']";

    await clickElement('click', 'element', reportCategorySelector);
};


