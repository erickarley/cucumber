import setInputfield from '../../setInputfield';
import waitForDisplayed from '../../waitForDisplayed';

/**
 * Set the name for the hierarchy
 * @param  {String}   hierarchyName      The name of the hierarchy
 */
export default async(hierarchyName) => {
    /**
     * Selector for the field
     * @type {String}
     */
    const fieldSelector = "//input[@id='Name']";
    
    await waitForDisplayed(fieldSelector);
    await setInputfield('set', hierarchyName, fieldSelector);
};