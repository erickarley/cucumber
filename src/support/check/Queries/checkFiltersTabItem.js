import waitFor from '../../action/waitFor';
import { bigPause } from '../../constants';
import checkContainsText from '../checkContainsText';
import isExisting from '../isExisting';

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
    const filterNameSelector = "//filter-item//span[.='" + expectedFilterName +"']";
    if (falseCase == null) {
        await waitFor(filterNameSelector, bigPause, null, 'displayed');
        const currentText = await $(filterNameSelector).getText();
        expect(currentText).toEqual(
            expectedFilterName,
            // @ts-expect-error
            `Expected title to be "${expectedFilterName}" but found "${currentText}"`
        );
        //await checkContainsText('element',filterNameSelector, falseCase, expectedFilterName);
    }
    else{
        await isExisting(filterNameSelector,falseCase);
    }
};
