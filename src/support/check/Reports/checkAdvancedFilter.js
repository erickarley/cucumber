import waitForDisplayed from '../../action/waitForDisplayed';

/**
 * Check for a Header in the table
 * @param  {String}     position     top or bottom
 * @param  {String}     expectedValue The expected Value
 */
export default async(position, expectedValue) => {
    let inputSelector = '';

    if (position === 'top') {
        inputSelector = "//input[@ng-model='filterDialogCtrl.topValue']";
    }
    else {
        inputSelector = "//input[@ng-model='filterDialogCtrl.bottomValue']";
    }
    await waitForDisplayed(inputSelector);
    const currentText = await $(inputSelector).getValue();
    console.log(currentText);
    expect(currentText).toEqual(
        expectedValue,
        // @ts-expect-error
        `Expected title to be "${expectedValue}" but found "${currentText}"`
    );
    //await checkContainsText('element',inputSelector,false,expectedValue);
};
