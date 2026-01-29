import isExisting from '../isExisting';

/**
 * Check if the given string is in the column name path
 * @param  {String}   falseCase       Whether to check if the given string is in
 *                                    the column name path or not
 * @param  {String}   expectedDataElementName The string to check for
 */
export default async(falseCase, expectedDataElementName) => {
    /**
     * The column name selector
     * @type {String}
     */
    const dataElementNameSelector = "//div[@id='dataElements']//md-list-item//span[.='" + expectedDataElementName +"']";
    
    await isExisting(dataElementNameSelector,falseCase);
};
