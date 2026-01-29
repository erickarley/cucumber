import waitForDisplayed from '../../waitForDisplayed';
import waitFor from '../../waitFor';
import { bigPause } from '../../../constants';
import selectOption from '../../selectOption';
import setInputField from '../../setInputField';
import pause from '../../pause';

/**
 * Selects an device type for a row
 * @param  {String}   deviceType   deviceType
 * @param  {String}   rowNumber    row number
 */
export default async(deviceType, rowNumber) => {
    /**Selector for the deviceType
     * @type {String}
     */
    const deviceTypeSelector = "//div[@class='data']//tr[" + rowNumber +"]/td[2]/select";

    /**Selector for the input number
     * @type {String}
     */
    const cameraNumberSelector = "//div[@class='data']//tr[" + rowNumber +"]/td[3]//input[@data-bind[contains(.,'cameraNumber')]]";

    await waitForDisplayed(deviceTypeSelector);
    await waitFor(deviceTypeSelector, bigPause, null, 'enabled');
    await selectOption('text', deviceType, deviceTypeSelector);
    await setInputField('set','1',cameraNumberSelector);
    await pause(1000);
};