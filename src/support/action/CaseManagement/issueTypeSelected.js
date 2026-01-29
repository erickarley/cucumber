import { smallPause } from "../../constants";

/**
 * Select Issue Type if not already selected
 * @param   {String}    issueType The name of the issue type that should be selected
 */
export default async (issueType) => {
    const selectElement = await $('#acm-issuetype md-select');
    let text = await selectElement.getText();
    if (text !== issueType) {
        await selectElement.click();
    
        const selectMenu = await $('div.md-select-menu-container.md-active');
        await selectMenu.waitForExist({ timeout: smallPause, reverse: false });

        const menuOption = await selectMenu.$('md-option=' + issueType);
        await menuOption.click();
        await selectMenu.waitForExist({ timeout: smallPause, reverse: true });
    }
};
