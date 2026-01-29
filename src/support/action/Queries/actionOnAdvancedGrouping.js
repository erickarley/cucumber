import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { bigPause } from '../../constants';

/**
 * action to select
 * @param {String}      actionToPerform     action text to click
 */

export default async(actionToPerform) => {
    let action = '';
    if (actionToPerform == 'edit') {
        action = 'Edit';
    }
    else {
        action = 'Delete';
    }
    /**
     * Selector for the action button
     * @type {String}
     */
    const actionButtonSelector = "//h3[.='Advanced Grouping']/following-sibling::div/span[.='" + action + "']";

    await waitForDisplayed(actionButtonSelector);
    await waitFor(actionButtonSelector, bigPause, null, 'enabled');
    await clickElement('click','element',actionButtonSelector);
}