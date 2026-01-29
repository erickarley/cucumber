import checkAvailability from '../Common/checkAvailability';
import checkLoadingOverlay from '../Common/checkLoadingOverlay';
import isExisting from '../isExisting';

/**
 * Check if the given string is in the column name path
 * @param  {String}   falseCase       Whether to check if the given string is in
 *                                    the column name path or not
 * @param  {String}   expectedColumnName The string to check for
 */
export default async (expectedColumnName, falseCase) => {
    /**
     * The column name selector
     * @type {String}
     */
    const columnNameSelector = "//th[contains(.,'" + expectedColumnName +"')]";
    await checkAvailability();
    await checkLoadingOverlay();
    await isExisting(columnNameSelector,falseCase);
};
