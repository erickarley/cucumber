import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';

/**
 * hierarchy name to Click
 * @param  {String}   columnToAdd The hierarchy to choose
 */
    export default async(columnToAdd) => {
    /**
     * Selector for the hierarchy checkbox
     * @type {String}
     */
    const columnToAddSelector = "//li[@role='menuitemcheckbox'][.='" + columnToAdd +"']";

    await waitForDisplayed(columnToAddSelector);
    await clickElement('click','element',columnToAddSelector);
}
