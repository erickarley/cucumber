import setInputfield from '../setInputField';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { bigPause, smallPause } from '../../constants';
import pause from '../pause';

/**
 * Sets a value on an email field
 * @param  {String}   emailAddress      The email
 */
export default async(emailAddress) => {
    /**
     * Selector for the filter
     * @type {String}
     */
    const emailFieldSelector = "//input[@type='email']";
    
    await waitForDisplayed(emailFieldSelector);
    await waitFor(emailFieldSelector, bigPause, null, 'enabled');
    await setInputfield('set',emailAddress,emailFieldSelector);
    await pause(smallPause);
};