import checkContainsText from '../checkContainsText';
import isExisting from '../isExisting';

/**
 * Check for a Header in the table
 * @param  {String}     expectedHeader  The expected Header text
 * @param  {String}     falseCase       The falseCase value 
 */
export default async(expectedHeader, falseCase) => {
    /**
     * The Header of the page
     * @type {String}
     */
    const HeaderSelector = "//th[.='" + expectedHeader + "']";

    /**
     * Selector for the field
     * @type {String}
     */
    const fieldSelector = "//input[@name='reportName']";

    let objectToCheck = await $$(fieldSelector);

    if (objectToCheck.length > 0) {    
        await isExisting(HeaderSelector,falseCase);
    }
};
