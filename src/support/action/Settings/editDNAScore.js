import clickElement from '../clickElement';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';

/**
 * Edit a DNA Score
 * @param {String}      dnaScoreName     The option to select
 */

export default async(dnaScoreName) => {
    /**
     * Selector for the add button
     * @type {String}
     */
    const dnaScoreSelector = "//td[.='" + dnaScoreName + "']/ancestor-or-self::tr/td[2]//a";

    await waitForDisplayed(dnaScoreSelector);
    await checkIfElementExists(dnaScoreSelector);
    await clickElement('click','element',dnaScoreSelector);
}