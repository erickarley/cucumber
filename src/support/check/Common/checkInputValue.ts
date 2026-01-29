import type { Selector } from 'webdriverio';

import checkIfElementExists from '../../lib/checkIfElementExists';

/**
 * Check the value of the given input field to the given value of the
 * current selector value
 * @param  {String}   selector Element selector
 * @param  {String}   value   The value to check for
 */
export default async (selector: Selector, value: string) => {
    /**
     * The command to perform on the browser object (addValue or setValue)
     * @type {String}
     */
    const element = await $(selector);
    await checkIfElementExists(selector, false, 1);
    
    var inputValue = await element.getValue();

    expect(value).toEqual(inputValue);
};
