import waitForDisplayed from "../waitForDisplayed";

/**
 * Parse the api response and store it on the shared storage
 * @param  {String}     nameForStoredKey          The key name
 */
export default async(nameForStoredKey) => {
    //waitForDisplayed('//body/pre');
    let json = JSON.parse($('//body/pre').getHTML(false));
    let toPrint = JSON.stringify(json);
    //console.log(toPrint);

    await browser.sharedStore.set(nameForStoredKey,toPrint);    
};