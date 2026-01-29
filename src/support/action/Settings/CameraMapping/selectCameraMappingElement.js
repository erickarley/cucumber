import waitForDisplayed from '../../waitForDisplayed';
import waitFor from '../../waitFor';
import { bigPause } from '../../../constants';
import selectOption from '../../selectOption';
import mapper from  './cameraMappingMap';

/**
 * Selects a hierarchy element
 * @param  {String}   elementValue   hierarchyName
 */
export default async(elementValue) => {
    /**Selector for the hierarchyName
     * @type {String}
     */
     const elementSelector = mapper(elementValue);
    
    await waitForDisplayed(elementSelector);
    await waitFor(elementSelector, bigPause, null, 'enabled');
    await selectOption('text', elementValue, elementSelector);
};