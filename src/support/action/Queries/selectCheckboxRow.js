import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';
import waitFor from '../waitFor';
import { bigPause, mediumPause } from '../../constants';
import pause from '../pause';

/**
 * Number of the row to mark
 
 * @param {Number}      rowNumber     row number to click
 * @param {String}      falseCase     word: no
*/

export default async(rowNumber, falseCase) => {
    /**
     * Selector for the checkbox button
     * @type {String}
     */
    let checkboxSelector = "";

    // console.log("Is false case null? ",falseCase);
    // if (falseCase == null) {
        checkboxSelector = "//div[@class[contains(.,'k-grid-content')]]//tr[@class='k-master-row']["+ (rowNumber+1) + "]//input";
    // } 
    // else {
    //     checkboxSelector = "//*[@id='stickyGrid']//tr[" + rowNumber + "]//input";
    // }

    await waitForDisplayed(checkboxSelector);
    await waitFor(checkboxSelector, bigPause, null, 'enabled');
    await clickElement('click','element',checkboxSelector);
    await pause(mediumPause);
}