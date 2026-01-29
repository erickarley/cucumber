import isExisting from '../isExisting';

/**
 * Check if the report contains the simple date field and the pagination section
 */
export default async() => {
    /**
     * The simple date range selector
     * @type {String}
     */
    const simpleDateSelector = "//div[@id='simpleDateRange']";
    
    await isExisting(simpleDateSelector,null);

    /**
     * The pagination selector
     * @type {String}
     */
    const paginationSelector = "//span[contains(.,'items per page')]";
    
    await isExisting(paginationSelector,null);

};
