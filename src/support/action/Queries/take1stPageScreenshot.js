/**
 * Takes a screenshot to a query result
 * @param  {String}     searchCriteria      Name for the criteria
 * @param  {String}     filterName      Name for the filter
 * @param  {String}     filterType      Name for the filter type
 */
export default async(searchCriteria, filterName,filterType) => {
    /**
     * The URL of the current browser window
     * @type {String}
     */
    let currentUrl = browser.getUrl().replace(/http(s?):\/\//, '');

    /**
     * The base URL of the current browser window
     * @type {Object}
     */
    // let domain = `${currentUrl.split('/')[0]}`;
    // domain = domain.replace(':','-port');

    let keyName = searchCriteria + '-' + filterName + '-' + filterType + '-QUERY-';

    //browser.saveFullPageScreen(keyName);

    //const elem = await $("//*[@class='flex1 query-side-nav open']");
    // const elem = await $("//*[@class[contains(.,'agilence-receipt-v2')]]");
    let numberOfResults = await $("//div[@ng-if='!controller.querySharedService.state.isEditMode']//span[contains(.,'Results: ')]").getText();
    numberOfResults = numberOfResults.replace(" )",'');
    numberOfResults = numberOfResults.replace("( Results: ",'');
    if (parseInt(numberOfResults) > 0) {
        await browser.saveScreenshot(keyName + 'NumResults-' + numberOfResults, { /* some options*/ });
    }
    else
    {
        let screenshotName = searchCriteria + '-' + filterName + '-' + filterType +'-HAS-NO-RECORDS';
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};
