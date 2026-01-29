import waitForDisplayed from '../../action/waitForDisplayed';
import checkContainsText from '../checkContainsText';

/**
 * Check the message of the forgot password
 * @param  {Type}     expectedMessage The expected message
 */
export default async(expectedMessage) => {
    /**
     * The message of the page
     * @type {String}
     */
    const forgotPasswordPopUpMessage = "//md-dialog-content//p";

    await waitForDisplayed(forgotPasswordPopUpMessage);

    let textFromMessage = await $(forgotPasswordPopUpMessage).getText();

    textFromMessage = textFromMessage.replace('  ', ' ');
    expect(textFromMessage).to.equal(expectedMessage, 'Comparison of the text not working');
};
