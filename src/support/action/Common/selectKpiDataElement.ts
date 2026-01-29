import clickElement from '../clickElement';


/**
 * Clicks a button on 2020
 * @param  {String}   elementText           Text on the button
 */

export default async (elementText: string) => {

    const elementSelector = "//*[@id='itemListWithSearch']/md-list/md-list-item/div[1]/button/span[text()='" + elementText + "']";

    let elementToFind = await $$(elementSelector);

    if (elementToFind.length == 0) {
        throw Error("Could not find element '" + elementSelector + "'");
    }

    let button = await  elementToFind[0].parentElement();
    await $(button).click();
}
