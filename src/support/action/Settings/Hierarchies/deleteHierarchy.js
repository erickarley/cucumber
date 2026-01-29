import clickElement from '../../clickElement';
import pause from '../../pause';
import clickButton from '../../Common/clickButton';
import { bigPause, mediumPause } from '../../../constants';
import checkBreadCrumb from '../../../check/Settings/checkBreadCrumb';
import waitLoadingGif from '../../../check/Common/waitLoadingGif';
import checkAvailability from '../../../check/Common/checkAvailability';

/**
 * Deletes all hierarchies containing the specified name.
 * Retries clicking the delete icon if the confirmation dialog does not appear.
 * @param {String} hierarchyName
 */
export default async (hierarchyName) => {
    const hierarchyNameSelectorBase = "//td[6]/span";
    const hierarchyNameSelector = `//td[6]/span[contains(.,'${hierarchyName}')]`;

    await checkAvailability();
    let listOfHierarchiesToDelete = await $$(hierarchyNameSelector);
    let numberOfHierarchiesToDelete = listOfHierarchiesToDelete.length;
    let hierarchiesToString = [];

    for (let i = 0; i < numberOfHierarchiesToDelete; i++) {
        hierarchiesToString.push(await listOfHierarchiesToDelete[i].getText());
    }

    // Delete hierarchies from bottom to top
    for (let i = numberOfHierarchiesToDelete - 1; i >= 0; i--) {
        const hierarchyToDelete = hierarchiesToString[i];
        console.log(`Hierarchy to delete: ${i}-${hierarchyToDelete}`);

        await checkBreadCrumb('Manage Hierarchies');
        await checkAvailability();

        const deleteButtonSelector = `${hierarchyNameSelectorBase}[.='${hierarchyToDelete}']/ancestor::tr/td[2]//button`;

        let retryCount = 0;
        let success = false;

        while (retryCount < 3 && !success) {
            try {
                console.log(`🗑 Attempt ${retryCount + 1}: Clicking delete for "${hierarchyToDelete}"`);
                await clickElement('click', 'element', deleteButtonSelector);
                await pause(mediumPause);

                // Check if the Continue button or modal appeared
                const continueBtn = await $$("//button[contains(.,'Continue')]");
                const dialogVisible =
                    continueBtn.length > 0 && await continueBtn[0].isDisplayed();

                if (dialogVisible) {
                    console.log(`🟢 Confirmation dialog detected for "${hierarchyToDelete}"`);
                    await clickButton('Continue');
                    await checkAvailability();
                    success = true;
                } else {
                    // Also validate if the row disappeared (deletion might have auto-applied)
                    const rowStillExists = await $$(deleteButtonSelector);
                    if (rowStillExists.length === 0) {
                        console.log(`✅ Row for "${hierarchyToDelete}" already removed`);
                        success = true;
                    } else {
                        console.log(`⚠️ No dialog and row still visible — retrying delete...`);
                        retryCount++;
                        await pause(mediumPause);
                    }
                }
            } catch (err) {
                console.log(`❌ Error during delete attempt ${retryCount + 1}: ${err.message}`);
                retryCount++;
                await pause(mediumPause);
            }
        }

        if (!success) {
            console.warn(`❌ Failed to delete hierarchy "${hierarchyToDelete}" after ${retryCount} attempts`);
            await browser.saveScreenshot(`./reports/DeleteFail-${hierarchyToDelete.replace(/\s+/g, '_')}-${Date.now()}.png`);
        }

        await checkAvailability();
    }
};
