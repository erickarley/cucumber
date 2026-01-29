import isExisting from '../isExisting';

/**
 * Check if the given string is in the MenuItem name path
 * @param  {String}   buttonText The string to check for
 * @param  {String}   falseCase  is Enabled?
 */
export default async(buttonText, falseCase) => {
    /**
     * The Button selector
     * @type {String}
     */
    let disabledButtonSelector
    if (falseCase == 'enabled') {
        disabledButtonSelector = "//button[.='" + buttonText + "']";
    }
    else {
        disabledButtonSelector = "//button[.='" + buttonText + "'][@disabled='disabled']";
    }
    await isExisting(disabledButtonSelector,null);
};
