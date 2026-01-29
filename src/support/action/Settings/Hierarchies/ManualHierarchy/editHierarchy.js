import clickElement from '../../../clickElement';
import checkBreadCrumb from '../../../../check/Settings/checkBreadCrumb';
import waitLoadingGif from '../../../../check/Common/waitLoadingGif';

/**
 * Item to click
 * @param {String}      hierarchyName     Item to click
 */

export default async(hierarchyName) => {

    const hierarchyNameSelectorBase = "//td[6]/span";
    
    /**
     * Selector for the Hierarchy to delete
     * @type {String}
     */
    const hierarchyNameSelector = "//td[6]/span[contains(.,'" + hierarchyName +"')]";

    let listOfHierarchiesToEdit = await $$(hierarchyNameSelector);

    expect(listOfHierarchiesToEdit.length).toEqual(
        1,
        // @ts-expect-error
        `More than one hierarchy was recovered`
    );

    let hierarchy = await listOfHierarchiesToEdit[0].getText();

    await checkBreadCrumb("Manage Hierarchies");
    await waitLoadingGif(true);
    await clickElement('click', 'element', hierarchyNameSelectorBase + "[.='" + hierarchy +"']/ancestor::tr/td[1]//button");
};