import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { longPause } from '../../constants';
import pause from '../pause';
import setInputField from '../setInputField';

/**
 * Clicks a tab on 2020
 * @param  {String}   inputSelector           Text on the tab
 */

export default async(inputSelector: string) => {

    let selector = await $$(inputSelector);

    if (selector.length == 0) {
        throw Error("Could not find input '" + inputSelector + "'");
    }

    if (selector.length > 1) {
        throw Error("Could not find input '" + inputSelector + "'");
    }

    let value = (new Date()).getTime();

    await setInputField('set', value.toString(), inputSelector);
}
