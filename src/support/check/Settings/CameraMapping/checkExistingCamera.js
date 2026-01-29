import waitForDisplayed from '../../../action/waitForDisplayed';
import checkContainsText from '../../checkContainsText';

/**
 * Check for a camera in the table
 * @param  {String}     cameraName     The name type to check
 * @param  {String}     falseCase The expected Header text
 */
export default async(cameraName, falseCase) => {
    /**
    * The Header of the page
    * @type {String}
    */
    const cameraNameSelector = "//div[@class='data']//span[.='" + cameraName + "']";

    await waitForDisplayed(cameraNameSelector);
    const currentText = await $(cameraNameSelector).getText();
    expect(currentText).toEqual(
        cameraName,
        // @ts-expect-error
        `Expected title to be "${cameraName}" but found "${currentText}"`
    );
    //checkContainsText('element',cameraNameSelector,falseCase,cameraName);
};
