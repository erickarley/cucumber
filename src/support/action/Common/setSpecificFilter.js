import clickElement from '../clickElement';
import setInputfield from '../setInputField';
import pause from '../pause';
import waitForDisplayed from '../../action/waitForDisplayed';

/**
 * Selects a Filter
 * @param  {String}   filtersSearchSelector    Filter search field selector
 * @param  {String}   filtersListSelector      Selector for the filters list element
 * @param  {String}   filterNameList           List of filters to select
 */

export default async(filtersSearchSelector, filtersListSelector, filterNameList) => {

    if (filterNameList != null) {
        //Search the filters
        let filtersArray = filterNameList.split(',');
        for (let i = 0; i < filtersArray.length; i++) {
            await setInputfield('add', filterNameList[i], filtersSearchSelector);
            await pause(1000);
            await waitForDisplayed(filtersListSelector)
            await clickElement('click','element',filtersListSelector);
            await pause(1000);
            await setInputfield('set', '', filtersSearchSelector);
            await pause(500);
        }        
    }
};