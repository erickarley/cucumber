import isExisting from '../isExisting';

/**
 * Check if the given string is in the MenuItem name path
 * @param  {String}   parentMenuItem  The menu containing the sub item
 * @param  {String}   expectedMenuSubItemName The subItem
 */
export default async(expectedMenuSubItemName, parentMenuItem) => {
    /**
     * The MenuItem name selector
     * @type {String}
     */
    const MenuSubItemNameSelector = "//span[.='" + parentMenuItem +"']/ancestor::div/a/span[contains(.,'" + expectedMenuSubItemName +"')]";
    
    await isExisting(MenuSubItemNameSelector,false);
};
