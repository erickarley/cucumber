import waitForDisplayed from '../../waitForDisplayed';
import clickElement from '../../clickElement';
import waitFor from '../../waitFor';
import { bigPause, smallPause } from '../../../constants';
import pause from '../../pause';

/**
 * Selects an element
 * @param  {String}   elementName   elementName
 */
export default async(elementName) => {
    /**
     * Selector for the button
     * @type {String}
     */
    const elementNameSelector = "//a[@class='dynatree-title'][.='"+ elementName +"']/preceding-sibling::span";
    await waitForDisplayed(elementNameSelector);
    await waitFor(elementNameSelector, bigPause, null, 'enabled');
    await pause(smallPause);
    await clickElement('click','element', elementNameSelector);
};