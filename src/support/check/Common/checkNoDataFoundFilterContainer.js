import waitForDisplayed from '../../action/waitForDisplayed';
import checkContainsText from '../checkContainsText';

/**
 * Check the noDataFound filterAnswer answer
 * @param  {String}     filterAnswer The expected noDataFound
 */
export default async(filterAnswer) => {
    /**
     * The noDataFound of the task
     * @type {String}
     */
    const noDataFoundSelector = "//*[@class[contains(.,'k-animation-container')]]";

    await waitForDisplayed(noDataFoundSelector);
    checkContainsText('element',noDataFoundSelector,false,filterAnswer);
};
