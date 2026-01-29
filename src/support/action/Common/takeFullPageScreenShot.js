/**
 * Takes a screenshot and sets a name for the image
 * @param  {String}     nameOfScreen      Name for the screen
 */
export default async(nameOfScreen) => {
    /**
     * The URL of the current browser window
     * @type {String}
     */
    let currentUrl = (await browser.getUrl()).replace(/http(s?):\/\//, '');

    /**
     * The base URL of the current browser window
     * @type {Object}
     */
    let domain = `${currentUrl.split('/')[0]}`;
    domain = domain.replace(':','-port');
    let screenshotsFolder = await browser.sharedStore.get('screenshotsFolder');
    let keyName = nameOfScreen + '-' + domain + '-';
    await browser.saveFullPageScreen(screenshotsFolder + "/" + keyName);
};
