import isExisting from '../isExisting';

/**
 * Check if the given string is in the MenuItem name path
 * @param  {String}   falseCase       Whether to check if the given string is in
 *                                    the MenuItem name path or not
 * @param  {String}   expectedMenuItemName The string to check for
 */
export default async(expectedMenuItemName, falseCase) => {
    /**
     * The MenuItem name selector
     * @type {String}
     */
    const MenuItemNameSelector = "//span[contains(.,'" + expectedMenuItemName +"')]";
    
    await isExisting(MenuItemNameSelector,falseCase);
};
