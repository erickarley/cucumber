import isExisting from './isExisting';
import waitForDisplayed from '../action/waitForDisplayed';

/**
 * Check if the given string is in the title name
 * @param  {String}   expectedTitle The string to check for
 */
export default async(action, expectedTitle, expectedTextContent) => {
    /**
     * The title name selector
     * @type {String}
     */
    
    const titleSelector = action =="create" ? "//div[@class='generic-modal-dialog-header-text']//div[.='"+ expectedTitle +"']"
        : "//div[@class='confirmHeader modal-dialog-header-text']//div[.='"+ expectedTitle +"']";

    /**
     * The text selector
     * @type {String}
     */
    const textContentSelector = action =="create" ? "//div[@class='generic-shadow-element generic-alert-body']//div[.='"+ expectedTextContent +"']"
        : "//div[@id='confirmBody']//div[contains(., '"+ expectedTextContent + "')]";
    
    await waitForDisplayed(titleSelector);
    await isExisting(titleSelector,false);
    await isExisting(textContentSelector,false);
};