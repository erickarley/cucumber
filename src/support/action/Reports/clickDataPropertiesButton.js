import clickElement from '../clickElement';
import waitForDisplayed from '../waitForDisplayed';

/**
 * hierarchy name to Click
 * @param  {String}   buttonName The hierarchy to choose
 */
    export default async(buttonName) => {
    /**
     * Selector for the hierarchy checkbox
     * @type {String}
     */
    const dataPropertiesButtonSelector = "//button[contains(.,'" + buttonName +"')]";

    // await waitForDisplayed(dataPropertiesButtonSelector);
    await clickElement('click','button',dataPropertiesButtonSelector);
}
