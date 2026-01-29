import clickElement from '../clickElement';
import mapper from  './queryMap';
import {  smallPause } from '../../constants';
import pause from '../pause';
/**
 * Clicks a button on 2020
 * @param  {String}   categoryType       Input text
 */

export default async (categoryType: string) => {

     console.log(categoryType);

     const elementSelector =   "//md-select[@placeholder='Choose Category']";
     const optionSelector = "//div[text()='" + categoryType + "']"
     console.log(elementSelector);
     console.log(optionSelector);
    
     await clickElement('click', 'selector', elementSelector);
     await clickElement('click', 'selector', optionSelector)
}
