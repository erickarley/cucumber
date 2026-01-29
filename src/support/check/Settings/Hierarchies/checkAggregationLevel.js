import waitForDisplayed from '../../../action/waitForDisplayed';
import { bigPause } from '../../../constants';
// import checkContainsText from '../../checkContainsText';

/**
 * Check the aggregation level of the current browser window
 * @param  {Type}     expectedAggregationLevel The expected aggregation level
 */
export default async(expectedAggregationLevel) => {
    /**
     * The aggregation level of the page
     * @type {String}
     */
    const aggregationlevelSelector = "//md-select[@ng-model='aggregationLevel.masterDataColumn']/md-select-value[contains(.,'" + expectedAggregationLevel + "')]";

    // await waitForDisplayed(aggregationlevelSelector);
    // await checkContainsText('element',aggregationlevelSelector,false,expectedAggregationLevel);
    await browser.waitUntil(
        async () => (await $(aggregationlevelSelector).isExisting()),
        {
            timeout: bigPause,
            timeoutMsg: 'Aggregation level not visible'
        }
    );
};
