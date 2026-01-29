import waitForDisplayed from '../waitForDisplayed';
import select2020DropDown from '../Common/select2020DropDown'

/**
 * Sets a field in Quick Query Transactions
 * @param  {String}   primTenderType            Primary Tendery Type
 */
export default async (primTenderType) => {
    /**
     * Selector for the Primary Tender Type
     * @type {String}
     */
    const primTenderTypeSelector = "//*[@placeholder='Primary Tender Type']";

    /**
     * Selector for the Primary Tender Type option
     * @type {String}
     */
    const primTenderTypeOptionSelector = "//md-option[@ng-repeat='pred in filter.PredefinedValues'][.='" + primTenderType +"']";

    if (primTenderType != null) {
        //Select Primary Tender Type
        await waitForDisplayed(primTenderTypeSelector);
        await select2020DropDown(primTenderTypeSelector,primTenderTypeOptionSelector,primTenderType);
    }
};