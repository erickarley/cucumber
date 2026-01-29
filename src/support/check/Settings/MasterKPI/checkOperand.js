import isExisting from '../../isExisting';
import waitFor from '../../../action/waitFor';
import { bigPause } from '../../../constants';

/**
 * Check if the given string is in the operand list for a master kpi
 * @param  {String}   falseCase       Whether to check if the given string is in
 *                                    the Filter name path or not
 * @param  {String}   indicatorName The string to check for
 */
export default async(falseCase, indicatorName) => {
    /**
     * The Filter name selector
     * @type {String}
     */
    const indicatorSelector = "//div[@deletable-kpi-element][contains(.,'" + indicatorName +"')]";
    await waitFor(indicatorSelector, bigPause, null, 'enabled');
    await isExisting(indicatorSelector,falseCase);
};
