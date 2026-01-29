import waitForDisplayed from '../../action/waitForDisplayed';
import { bigPause } from '../../constants';
import checkContainsText from '../checkContainsText';

/**
 * Check the createdDay of the current browser window
 * @param  {Type}     expectedCreatedDay The expected createdDay
 */
export default async(expectedCreatedDay) => {
    /**
     * The createdDay of the task
     * @type {String}
     */
    const createdDaySelector = "//background-task-manager-task[1]//div[1]/div[1]/div[1]";

    // await waitForDisplayed(createdDaySelector);
    const textOnTask = await $(createdDaySelector).getText();
    console.log(textOnTask);
    await browser.waitUntil(
        async () => (await $(createdDaySelector).isExisting()),
        {
            timeout: bigPause,
            timeoutMsg: 'Element not visible ' + createdDaySelector 
        }
    );
    expect(textOnTask).toContain(expectedCreatedDay);
};
