import pause from "../pause";
import { extraHugePause } from "../../constants";

/**
 * Open Acm to desired tab if not already open
 * @param   {String}    tabName The name of the tab that should be open
 */
export default async (tabName) => {
    const launcherSelector = tabName === 'create' ? '#acm-create' : '#acm-edit';
    const tabSelector = tabName === 'create' ? 'md-tab-item.acm-create-tab' : 'md-tab-item.acm-search-tab';

    const dialog = await $("#acm-dialog");
    if (!(await dialog.isDisplayed())) {

        const acmList = await $('#sidebar-acm-list');
        const acmListClasses = await acmList.getAttribute('class');
        if (acmListClasses.split(' ').indexOf("sidebar-row-expanded") === -1) {
            await acmList.click();
            await pause(500); // Animation 0.5s
        }

        const launcher = await $(launcherSelector);
        await launcher.click();
        await dialog.waitForExist({ timeout: extraHugePause, reverse: false });

        const acmLoadingOverlay = await $('#acm-loading-overlay');
        await acmLoadingOverlay.waitForDisplayed({ timeout: extraHugePause, reverse: true });
    }
    
    const tab = await $(tabSelector);
    const tabClasses = await tab.getAttribute('class');
    if (tabClasses.split(' ').indexOf('md-active') === -1) {
        await tab.click();
    }
};
