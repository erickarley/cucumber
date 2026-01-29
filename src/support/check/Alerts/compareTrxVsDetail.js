import waitForDisplayed from '../../action/waitForDisplayed';
import checkContainsText from '../checkContainsText';

/**
 * Checks that cell on transactions is also displayed with the same value on the Detailed view
 * @param  {Number}     cellNumber          The cell to capture value from
 * @param  {Number}     transactionNumber   The row to use
 * @param  {String}     fieldToCheck        Name of the field to check
 */
export default async(cellNumber, transactionNumber, fieldToCheck) => {
    /**
     * The selector for the row/cell
     * @type {String}
     */
    const selectorForRow = "//div[@kendo-grid='controller.transactionsGrid']/div[@class[contains(.,'k-grid-content')]]//tr["+ transactionNumber +"]/td["+ cellNumber +"]";

    await waitForDisplayed(selectorForRow);
    /**
     * The text of the cell
     * @type {String}
     */
    const textFromCell = await $(selectorForRow).getText();

    /**
     * The text of the field on the detailed view
     * @type {String}
     */
    const detailedFieldSelector = "//*[@class[contains(.,'main_transaction')]][contains(.,'" + fieldToCheck + "')]/span";

    await checkContainsText('element',detailedFieldSelector,false,textFromCell);
};
