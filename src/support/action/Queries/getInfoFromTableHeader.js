import waitForDisplayed from '../../action/waitForDisplayed';
import waitFor from '../waitFor';
import { bigPause, extraLongPause } from '../../constants';
import clickElement from "../clickElement";


/**
 * Gets a value from the X row based on the name of the header
 * @param  {Number}     rowNumber           Row to grab info from
 * @param  {String}     textOnTableHeader     Header to search for
 * @param  {String}     category            category for the filter
 */
//export default async(/*rowNumber, cellNumber,*/ keyName) => {
export default async(rowNumber, textOnTableHeader, category) => {

    /**
    * The header index
    * @type {String}
    */
    const headerSelector = "//th[@data-title='" + textOnTableHeader + "']";

    await waitFor(headerSelector,extraLongPause,null,'exist');

    /**
    * The header index
    * @type {Number}
    */
    let indexOfHeader = -1;

    const headers = await $$("//th/a");
    headers.forEach(isHeaderAvailable);

    function isHeaderAvailable(item, index, arr) {
        //console.log(arr[index].getText());

        if (arr[index].getText() == textOnTableHeader) {
            indexOfHeader = index;
        }
    }


    if (indexOfHeader != -1) {

        //offset required due to grid design and columns lost for UI elements
        indexOfHeader = indexOfHeader + 3;

        /**
         * The value of the table cell for the rownumber and the column index
         * @type {String}
         */
        const text = await $("//tr[" + rowNumber + "]/td[" + indexOfHeader + "]").getText();
        // console.log(text);

        let keyName = textOnTableHeader + '-' + rowNumber + '-';
        browser.sharedStore.set(keyName, text);

        /**
         * Selector for the cell
         * @type {String}
         */
        const queryCellSelector = "//tr[" + rowNumber +"]/td[" + indexOfHeader +"]";

        await waitForDisplayed(queryCellSelector);
        await waitFor(queryCellSelector, bigPause, null, 'enabled');
        await clickElement('click','element',queryCellSelector);
    }
    else {
        await browser.saveScreenshot(category + '-' + textOnTableHeader + '-' + 'ERROR-Header-Not-Available-On-Query');
        throw Error(category + '-' + textOnTableHeader + '-' + 'ERROR-Header-Not-Available-On-Query');
    }
};
