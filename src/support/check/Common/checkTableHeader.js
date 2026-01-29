import waitForDisplayed from '../../action/waitForDisplayed';
import checkContainsText from '../checkContainsText';

/**
 * Check for a Header in the table
 * @param  {Type}     expectedHeader The expected Header text
 */
export default async(expectedHeader) => {
    /**
     * The Header of the page
     * @type {String}
     */
    const HeaderSelector = "//th[.='" + expectedHeader + "']";

    await waitForDisplayed(HeaderSelector);
    const currentText = await $(HeaderSelector).getText();
    expect(currentText).toEqual(
        expectedHeader,
        // @ts-expect-error
        `Expected title to be "${expectedHeader}" but found "${currentText}"`
    );
    // await checkContainsText('element',HeaderSelector,false,expectedHeader);
};
