import checkSelected from '../checkSelected';

/**
 * Check if the given hierarchy element is selected
 * @param  {String}   hierarchyItemToCheck       Whether to check if the given name is in the list of hierarchy items is checked or not
 * @param  {String}   falseCase       True or False
 */
export default async(hierarchyItemToCheck, falseCase ) => {
    /**
     * The selector for the checkbox element
     * @type {String}
     */
    const checkboxToCheckSelector = "//span[.='" + hierarchyItemToCheck + "']/preceding-sibling::span[@class='k-checkbox-wrapper']/input"
    
    await checkSelected(checkboxToCheckSelector,falseCase);
};
