import isExisting from '../isExisting';

/**
 * Check if the report contains the simple date field and the pagination section
 */
export default async() => {
    /**
     * The dashboard name selector
     * @type {String}
     */
    const dashboardNameSelector = "//span[@ng-bind='controller.dashboardName']";

    await isExisting(dashboardNameSelector,null);
    
    /**
     * The pagination selector
     * @type {String}
     */
    const paginationSelector = "//span[contains(.,'items per page')]";
    
    await isExisting(paginationSelector,null);

};
