import getServerParam from '../../lib/getServerParam';
  
  /**
 * Takes a screenshot and sets a name for the image
 * @param  {String}     numberOfDashboard      Number for the dashboard
 * @param  {String}     idOfPage          Id of the dashboard or functionality
 */
export default async(numberOfDashboard) => {
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
    // let screenshotsFolder = await browser.sharedStore.get('screenshotsFolder');
    const screenshotsFolder = getServerParam();
    let keyName = "Dashboard-" + numberOfDashboard + '-' + domain;
    await browser.sharedStore.set('reportId', numberOfDashboard);
    await browser.sharedStore.set('entityType', "Dashboard");
    const section = await $('#dashboard-container'); 
    await section.scrollIntoView();
    await browser.pause(500); // allow layout to stabilize
    await section.saveScreenshot('./ScreenShots/' + screenshotsFolder + "/" + keyName + '.png');
    console.log('📸 Dashboard Section screenshot saved with name: ' + './ScreenShots/' + screenshotsFolder + "/" + keyName + '.png');
    // await browser.saveScreenshot('./ScreenShots/' + screenshotsFolder + "/" + keyName + '.png');
};
