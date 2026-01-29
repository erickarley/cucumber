// import { expect } from 'chai';

/**
 * Check if the given string is in the Banner name path
 * @param  {String}   criteria The criteria to use
 * @param  {String}   expectedNumber The expected number to check
 */
export default async(criteria, expectedNumber) => {

    let numberOfResults = await $("//div[@ng-if='!controller.querySharedService.state.isEditMode']//span[contains(.,'Results: ')]").getText();
    numberOfResults = numberOfResults.replace(" )",'');
    numberOfResults = numberOfResults.replace("( Results: ",'');
    // console.log(numberOfResults);

    if (criteria == 'more') {
        expect(parseInt(numberOfResults)).toBeGreaterThan(parseInt(expectedNumber), 'ERROR: Number of results on query: ' + numberOfResults + ' is higher than expected: ' + expectedNumber);
    }
    if (criteria == 'less') {
        expect(parseInt(numberOfResults)).toBeLessThan(parseInt(expectedNumber), 'ERROR: Number of results on query: ' + numberOfResults + ' is lower than expected: ' + expectedNumber);
    }
};
