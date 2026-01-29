import { Selector } from 'webdriverio';

import checkIfElementExists from '../lib/checkIfElementExists';
import clickElement from './clickElement';

/**
 * Perform an click action on the given element
 * @param  {String}   action  The action to perform (click or doubleClick)
 * @param  {String}   type    Type of the element (link or selector)
 * @param  {String}   selector Element selector
 */
export default async (
    action: 'click' | 'doubleClick',
    type: 'link' | 'selector',
    selector: Selector
) => {
    
    const elementList: Array<WebdriverIO.Element> = await $$(selector);

    for(let i = 1; i <= elementList.length; i++){
        let itemSelector = `(${selector})[1]`;
        await clickElement(action, type, itemSelector);
    }
};
