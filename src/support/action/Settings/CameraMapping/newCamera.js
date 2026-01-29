import setInputfield from '../../setInputfield';
import waitForDisplayed from '../../waitForDisplayed';
import selectOption from '../../selectOption';


/**
 * Selects a widget
 * @param  {String}   cameraName   cameraName
 * @param  {String}   cameraType   type of camera
 * @param  {String}   ipAddress    ipAddress
 * @param  {String}   cameraPort   port to use
 * @param  {String}   userName     username for the camera
 * @param  {String}   password     pass for the camera
 */
export default async(cameraName, cameraType, ipAddress, cameraPort, userName, password) => {

    /**Selector for the cameraName
     * @type {String}
     */
    const cameraNameSelector = "#devName";

    /**Selector for the cameraType
     * @type {String}
     */
    const cameraTypeSelector = "//select[@class='cameraMappingInput']";

    /**Selector for the ipAddress
     * @type {String}
     */
    const cameraIPAddressSelector = "//input[@data-bind='value:ip']";

    /**Selector for the port
     * @type {String}
     */
    const cameraPortSelector = "//input[@data-bind='value:port']";

    /**Selector for the username
     * @type {String}
     */
    const cameraUsernameSelector = "//input[@data-bind='value:user']";

    /**Selector for the password
     * @type {String}
     */
    const cameraPasswordSelector = "//input[@type='password']";

    await waitForDisplayed(cameraNameSelector);
    await setInputfield('set', cameraName, cameraNameSelector);
    await selectOption('text', cameraType, cameraTypeSelector);
    await setInputfield('set', ipAddress, cameraIPAddressSelector);
    await setInputfield('set', cameraPort, cameraPortSelector);
    await setInputfield('set', userName, cameraUsernameSelector);
    await setInputfield('set', password, cameraPasswordSelector);

};