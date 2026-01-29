import { hugePause } from '../../../constants'
/**
 * Check if the dialog overlay appears
 * @param  {String}   falseCase       Whether to check if displayed or not
 */
export default async(falseCase) => {
    /**
     * The Dialog Overaly selector
     * @type {String}
     */
    const dialogOverlaySelector = "//div[@id='dialogOverlay']";
    
    await $(dialogOverlaySelector).waitForDisplayed({ timeout: hugePause, reverse: !!falseCase});
};
