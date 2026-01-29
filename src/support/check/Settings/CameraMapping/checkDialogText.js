import { hugePause } from '../../../constants'
/**
 * Check if the dialog contains a message
 * @param  {String}   message         Message to check
 * @param  {String}   falseCase       Whether to check if displayed or not
 */
export default async(message, falseCase) => {
    /**
     * The Dialog container selector
     * @type {String}
     */
    const dialogMessageSelector = "//div[@id='overlayDialogSection']//div[.='" + message + "']";
    
    await $(dialogMessageSelector).waitForDisplayed(hugePause, !!falseCase);
};
