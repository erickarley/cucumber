import isExisting from '../isExisting';
import waitFor from '../../action/waitFor';
import { bigPause } from '../../constants';

/**
 * Check if the given string is in the Filter name path
 * @param  {String}   falseCase       Whether to check if the given string is in
 *                                    the Filter name path or not
 * @param  {String}   expectedFilterName The string to check for
 */
export default async(expectedFilterName, falseCase) => {
    /**
     * The Filter name selector
     * @type {String}
     */
    const filterNameSelector = "//span[.='" + expectedFilterName +"']";
    await waitFor(filterNameSelector, bigPause, null, 'enabled');
    await isExisting(filterNameSelector,falseCase);
};
