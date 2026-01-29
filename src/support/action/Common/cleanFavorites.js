import checkAvailability from '../../check/Common/checkAvailability';
import selectDashboardAction from '../Dashboards/selectDashboardAction';
import clickSideBarElement from '../SideBarMenu/clickSideBarElement';
import clickElement from '../clickElement';
import pause from '../pause';

export default async () => {
    const subMenuItem = "//span[.='Favorites']/ancestor::div/a[1]/span";

    const favoritesSideBarSelector = "//button[@aria-label='Favorites']"
    await checkAvailability();
    let elementToFind = await $$(favoritesSideBarSelector);

    while (elementToFind.length > 0) {
        //waitForDisplayed(subMenuItem);
        await clickSideBarElement('Favorites');
        await checkAvailability();
        await clickElement('click','element',subMenuItem);
        await checkAvailability();
        await selectDashboardAction('Favorite');
        await clickSideBarElement('Home');
        await checkAvailability();
        elementToFind = await $$(favoritesSideBarSelector);
    }
    // else {
    //     let screenshotName = 'Button-To-Click' + buttonText + '-NOT-EXISTS'; 
    //     screenshotName = screenshotName.replace(/\//g,'-');
    //     await browser.saveScreenshot('./ScreenShots/' + screenshotName + '.png');
    //     throw Error(screenshotName);
    // }
}
