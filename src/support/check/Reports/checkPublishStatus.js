//import { expect } from 'chai';
import checkLoadingOverlay from '../Common/checkLoadingOverlay';
import checkOverlay from '../Common/checkOverlay';
import waitLoadingGif from '../Common/waitLoadingGif';

/**
 * Check if the given string is in the column name path
 * @param  {String}   reportName       The name of the report
 * @param  {String}   publishedStatus The status is Private or Published
 */
export default async(reportName, publishedStatus) => {
    /**
     * The column name selector
     * @type {String}
     */
    const publishedStatusLocator = "//td[.='" + reportName + "']/parent::tr/td[8]";
    
    await checkLoadingOverlay(true);
    await checkOverlay(true);
    await waitLoadingGif(true);

    let elementToFind = await $$(publishedStatusLocator);

    if (elementToFind.length > 0) {
    //Actions of the step
        const status = await $(publishedStatusLocator).getText();    
        expect(status).toEqual(
            publishedStatus,
            // @ts-expect-error
            `Expected status for "${reportName}" to be "${publishedStatus}" but found "${status}"`
        );
    }
    else {
        let screenshotName = 'Report-' + reportName + '-IS-NOT-' + publishedStatus; 
        screenshotName = screenshotName.replace(/\//g,'-');
        screenshotName = screenshotName.replace(/\*/g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};
