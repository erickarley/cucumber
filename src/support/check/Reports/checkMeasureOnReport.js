import waitForDisplayed from '../../action/waitForDisplayed';
import checkContainsText from '../checkContainsText';

/**
 * Check for a Header in the table
 * @param  {String}     headerType     The Header type to check
 * @param  {String}     expectedHeader The expected Header text
 */
export default async(headerType, expectedHeader) => {
    let headerSelector = '';

    if (headerType == 'data element') {
        headerSelector = "//th//span[contains(.,'" + expectedHeader + "')]";
    }
    else {
        headerSelector = "//th//a[.='" + expectedHeader + "']";
    }
    await waitForDisplayed(headerSelector);
    const currentText = await $(headerSelector).getText();
    expect(currentText).toEqual(
        expectedHeader,
        // @ts-expect-error
        `Expected title to be "${expectedHeader}" but found "${currentText}"`
    );
    //await checkContainsText('element',headerSelector,false,expectedHeader);
};
