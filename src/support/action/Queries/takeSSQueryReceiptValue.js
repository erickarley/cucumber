//import pause from "../pause";

import { bigPause, mediumPause, extraLongPause, smallPause } from "../../constants";
import waitFor from "../waitFor";
import waitForDisplayed from "../waitForDisplayed";
import clickElement from "../clickElement";

/**
 * Takes a screenshot to a query result
 * @param  {String}     searchCriteria      Name for the criteria
 * @param  {String}     filterName      Name for the filter
 * @param  {String}     numberOfReceipts       Number of receipts to open
 * @param  {String}     filterType       Type of filter
 */
export default async(numberOfReceipts, searchCriteria, filterType, filterName, valueToValidate) => {
    /**
     * The URL of the current browser window
     * @type {String}
     */
    // let currentUrl = browser.getUrl().replace(/http(s?):\/\//, '');

    /**
     * The base URL of the current browser window
     * @type {Object}
     */
    // let domain = `${currentUrl.split('/')[0]}`;
    // domain = domain.replace(':','-port');

    let keyName = "";

    //browser.saveFullPageScreen(keyName);

    //const elem = await $("//*[@class='flex1 query-side-nav open']");
    // const elem = await $("//*[@class[contains(.,'agilence-receipt-v2')]]");
    const elem = await $("//*[@class='receipt'][@ng-repeat='receipt in receiptDirective.viewModelV2.receipts']");
    let top = 280; // number is not important, variable is

    let numberOfResults = await $("//div[@ng-if='!controller.querySharedService.state.isEditMode']//span[contains(.,'Results: ')]").getText();
    // console.log('Number of RESULTS: ' + numberOfResults);
    numberOfResults = numberOfResults.replace(" )",'');
    numberOfResults = numberOfResults.replace("( Results: ",'');
    let rowNumber;
    // console.log('Number of RESULTS: ' + numberOfResults);
    if (parseInt(numberOfResults) > 0) {
        for (rowNumber= 0; rowNumber < parseInt(numberOfReceipts); rowNumber++) {
            if (parseInt(numberOfResults) >= rowNumber) {
                keyName = searchCriteria + '-' + filterName + '-' + filterType + '-RECEIPT-' + valueToValidate + '-' + Number(parseInt(rowNumber)+1);
                browser.pause(mediumPause);

                const res = browser.execute(
                    (top) => {
                        /* tslint:disable no-var-keyword */
                        jQuery('.floating-sidebar-container')
                            .hide();
                        jQuery('.main-page')
                            .hide();
                        jQuery('.fixed-next-prev-container')
                            .hide();
                        jQuery('.previous-receipt')
                            .hide();
                        jQuery('.next-receipt')
                            .hide();
                        jQuery('.detail-view')
                            .hide();
                        jQuery('.query-side-nav')
                            .css("overflow-y","inherit");
                        jQuery('.query-side-nav')
                            .css("position","inherit");
                        return;
                    },
                    top,
                );

                browser.pause(mediumPause);

                let screenshotsFolder = browser.sharedStore.get('screenshotsFolder');
                
                browser.saveFullPageScreen(screenshotsFolder + "/" + keyName, { /* some options*/ });
                browser.pause(mediumPause);
                if (parseInt(numberOfResults) > rowNumber+1) {                 
                    const showResults = browser.execute(
                        (top) => {
                            /* tslint:disable no-var-keyword */
                            jQuery('.main-page')
                                .show();
                            jQuery('.detail-view')
                                .show();
                            return;
                        },
                        top,
                    );
                    browser.pause(smallPause);
                    const queryCellSelector = "//tr[" + parseInt(rowNumber+2) + "]/td[5]";
                    await waitForDisplayed(queryCellSelector);
                    await waitFor(queryCellSelector, bigPause, null, 'enabled');
                    await clickElement('click', 'element', queryCellSelector);
                }
            }
        }
    }
    else
    {
        let screenshotName = searchCriteria + '-' + filterName + '-' + filterType +'-HAS-NO-RECORDS';
        screenshotName = screenshotName.replace(/\//g,'-');
        await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
        throw Error(screenshotName);
    }
};


