import clickElement from '../clickElement';
import clearInputField from '../clearInputField';
import setInputField from '../setInputField';

/**
 * Performs login with the following credentials
 * @param  {String}   userName      The username
 * @param  {String}   password      The password
 */
export default async (userName, password) => {
    const sel4UserName = '#username';
    const sel4Password = '#password';
    const loginButton = '#submitbutton';

    // Wait for username field to be present and displayed
    await browser.waitUntil(
        async () => {
            const el = await $(sel4UserName);
            return await el.isDisplayed() && await el.isEnabled();
        },
        {
            timeout: 10000,
            timeoutMsg: 'Username input field not ready'
        }
    );

    // Ensure password field is also ready
    await browser.waitUntil(
        async () => {
            const el = await $(sel4Password);
            return await el.isDisplayed() && await el.isEnabled();
        },
        {
            timeout: 10000,
            timeoutMsg: 'Password input field not ready'
        }
    );

    // Enter username and password
    await clearInputField(sel4UserName);
    await setInputField('add', userName, sel4UserName);

    await clearInputField(sel4Password);
    await setInputField('add', password, sel4Password);

    // Wait for login button to be interactable
    await browser.waitUntil(
        async () => {
            const el = await $(loginButton);
            return await el.isDisplayed() && await el.isEnabled();
        },
        {
            timeout: 5000,
            timeoutMsg: 'Login button not ready'
        }
    );

    // Click login button
    await clickElement('click', 'button', loginButton);
};
