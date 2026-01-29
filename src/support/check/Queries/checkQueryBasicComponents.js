import isExisting from '../isExisting';

/**
 * Check if the report contains the simple date field and the pagination section
 */
export default async() => {
    /**
     * The number of results selector
     * @type {String}
     */
    const numberOfResults = "//div[@ng-if='!controller.querySharedService.state.isEditMode']//span[contains(.,'Results: ')]";

    await isExisting(numberOfResults,null);
    
    /**
     * The pagination selector
     * @type {String}
     */
    const paginationSelector = "//span[contains(.,'items per page')]";
    
    await isExisting(paginationSelector,null);

};
