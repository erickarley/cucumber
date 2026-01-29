import clickElement from '../clickElement';


/**
 * Clicks a button on 2020
 * @param  {String}   linkText           Text on the button
 */

export default async (linkText) => {
    /**
     * Selector for the button
     * @type {String}
     */
    const linkTextSelector = "//tr//a[contains(.,'" + linkText + "')]";
    await clickElement('click','button',linkTextSelector);
          
}
