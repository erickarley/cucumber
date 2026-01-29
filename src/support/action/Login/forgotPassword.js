import clickElement from '../clickElement';
import clearInputField from '../clearInputField';
import setInputField from '../setInputField';

/**
 * Performs reset of password
 * @param  {String}   email      The email that I want to reset password for
 */
export default async (email) => {
    /**
     * Selector for the forgot password button on the login page
     * @type {String}
     */
    const selector4ForgotButton = '#forgotpassword';

    /**
     * Selector for the email to reset
     * @type {String}
     */
    const sel4Email = '//input';

    // Clicking on the login page
    await clickElement('click', 'button',selector4ForgotButton);

    //On the forgot your password page
    await clearInputField(sel4Email);
    await setInputField('add', email, sel4Email);
    await clickElement('click', 'button','#submitbutton');
};