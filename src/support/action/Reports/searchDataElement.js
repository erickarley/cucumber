import setInputfield from '../setInputField';
import waitForDisplayed from '../waitForDisplayed';

/**
 * Sets a value on the data element search
 * @param  {String}   valueToSearch      The value to search
 */
export default async(valueToSearch) => {
    /**
     * Selector for the field
     * @type {String}
     */
    const searchFieldSelector = "//div[@aria-hidden='false']/span/input[@ng-model='dataElementController.search']";
    
    await waitForDisplayed(searchFieldSelector);
    await setInputfield('set',valueToSearch,searchFieldSelector);
};