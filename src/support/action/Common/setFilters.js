import clickElement from '../clickElement';
import setInputField from '../setInputField';
import pause from '../pause';
import waitForDisplayed from '../../action/waitForDisplayed';
import { mediumPause, smallPause } from '../../constants';
import clearInputField from '../clearInputField';

/**
 * Selects a Filter
 * @param  {String}   filtersSearchSelector    Filter search field selector
 * @param  {String}   filtersListSelector      Selector for the filters list element
 * @param  {String}   filterNameList           List of filters to select
 */

export default async (filtersSearchSelector, filtersListSelector, filterNameList) => {


    if (filterNameList != null) {
        //Search the filters
        let filtersArray = filterNameList.split(',');
        // console.log("Number of filters: " + filtersArray.length);

        for (let i = 0; i < filtersArray.length; i++) {
            await pause(mediumPause);
            // clearInputField(filtersSearchSelector);
            await clickElement('click','element',filtersSearchSelector);
            await $(filtersSearchSelector).addValue(filtersArray[i]);
            // setInputField('add',arr[index],filtersSearchSelector);
            await pause(smallPause);
            // console.log(filtersSearchSelector);
            // console.log(item);
            let filterToFind = filtersArray[i];
            //console.log(filterToFind);
            let listedFilters;
            if (filtersListSelector.indexOf('span') !== -1) {
                //console.log(filtersListSelector.substring(0, filtersListSelector.indexOf('span')+4));
                listedFilters = await $$(filtersListSelector.substring(0, filtersListSelector.indexOf('span')+4));
            }
            else if (filtersListSelector.indexOf('div/button/p') !== -1) {
                // console.log('Roles list selected')
                // console.log(filtersListSelector);
                filtersListSelector = filtersListSelector + "[.='" + filterToFind + "']";
                listedFilters = await $$(filtersListSelector);
                // console.log(filtersListSelector);
            }
            else {
                listedFilters = await $$(filtersListSelector);
            }

            let isAvailable = false;
            for (let j = 0; j < listedFilters; j++) {
                let text = await listedFilters[i].getText();
                if (text.toUpperCase() == filterToFind.toUpperCase()) {
                    isAvailable = true;
                    break;
                }
            }

            if (isAvailable == false) {
                let screenshotName = 'Error-Filter-' + filterToFind + '-NOT-EXISTS';
                screenshotName = screenshotName.replace(/\//g,'-');
        
                await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
                throw Error(screenshotName);
            }
            else {
                // console.log('Filter to click: ' + filtersListSelector);
                await waitForDisplayed(filtersListSelector)
                await clickElement('click','element',filtersListSelector);
                await pause(1000);
                // setInputField('set', '', filtersSearchSelector);
                // pause(500);
            };
        }   
    }
};