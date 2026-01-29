import isExisting from '../isExisting';

/**
 * Check if the given string is in the MenuItem name path
 * @param  {String}   buttonText The string to check for
 * @param  {String}   falseCase  is Enabled?
 */
export default async (selector: string, falseCase: string) => {
    /**
     * The Button selector
     * @type {String}
     */
    let disabledElementSelector: string;
    if (falseCase === 'enabled') {
        disabledElementSelector = selector;
    }
    else {
        disabledElementSelector = selector + "[@disabled='disabled']";
    }
    await isExisting(disabledElementSelector, null);
};