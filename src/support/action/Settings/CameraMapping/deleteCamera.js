import waitForDisplayed from '../../waitForDisplayed';
import clickElement from '../../clickElement';
import waitFor from '../../waitFor';
import { bigPause } from '../../../constants';

/**
 * Deletes a Camera
 * @param  {String}   cameraName   cameraName
 */
export default async(cameraName) => {
    /**
     * Selector for the button
     * @type {String}
     */
    const deleteCameraSelector = "//div[@class='data']//span[.='"+ cameraName +"']/preceding::td[@data-bind[contains(.,'removeDevice')]]";
    await waitForDisplayed(deleteCameraSelector);
    await waitFor(deleteCameraSelector, bigPause, null, 'enabled');
    await clickElement('click','element', deleteCameraSelector);
    
};