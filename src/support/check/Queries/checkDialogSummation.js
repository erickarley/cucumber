import checkEqualsText from '../checkEqualsText'; 
import isExisting from '../isExisting';
import waitForDisplayed from '../../action/waitForDisplayed';

/**
 * Check if the given string is in the title name
 * @param  {String}   expectedTitle The string to check for
 */
export default async(expectedTitle, expectedTextContent) => {
    /**
     * The title name selector
     * @type {String}
     */
    const titleSelector = "//md-dialog//h2[contains(.,'"+ expectedTitle +"')]";

    /**
     * The text selector
     * @type {String}
     */
    const textContentSelector = "//md-dialog//div[contains(.,'"+ expectedTextContent +"')]";
    
    await waitForDisplayed(titleSelector);
    await isExisting(titleSelector,false);
    await isExisting(textContentSelector,false);
    // checkEqualsText('element', titleSelector, null, expectedTitle);
    // checkEqualsText('element', textContentSelector, null, expectedTextContent);
};
