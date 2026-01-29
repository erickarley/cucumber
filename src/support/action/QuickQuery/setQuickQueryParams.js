import setInputfield from '../setInputField';
import clickElement from '../clickElement';
import checkIfElementExists from '../../lib/checkIfElementExists';
import waitForDisplayed from '../waitForDisplayed';
import pause from '../pause';
import pressButton from '../pressButton';

/**
 * Selects a widget
 * @param  {String}   transactionTime           Transaction Time
 * @param  {String}   store                     store
 * @param  {String}   associateNumber           associate number
 * @param  {String}   orderNumber               order number
 * @param  {String}   Reg                       Reg
 * @param  {String}   orderTotalFrom            Order Total range from
 * @param  {String}   orderTotalTo              Order Total range to
 * @param  {String}   mgrId                     Manager Id
 * @param  {String}   custId                    Customer Id
 * @param  {String}   primTenderAcct            Primary tender Account
 * @param  {String}   primTenderType            Primary Tendery Type
 * @param  {String}   billCustAdd               Billing Customer Address
 * @param  {String}   trx                       Transaction
 * @param  {String}   rfndRtnCount              Return Refund Item Count
 */
export default async(transactionTime, store, associateNumber, orderNumber, Reg, orderTotalFrom, orderTotalTo, mgrId,custId,primTenderAcct, primTenderType, billCustAdd,trx, rfndRtnCount) => {
    /**
     * Selector for the transactionTime
     * @type {String}
     */
    const transactionTimeSelector = "//*[@placeholder='Transaction Date/Time']";

    /**
     * Selector for the transactionTime option
     * @type {String}
     */
    const transactionTimeOptionSelector = "//md-option[@ng-repeat='opt in options'][.='" + transactionTime + "']";

    /**
     * Selector for the store
     * @type {String}
     */
    const storeSelector = "//input[@placeholder='Start typing a store number']";

    /**
     * Selector for the associate number
     * @type {String}
     */
    const associateNumberSelector = "//input[@name='id4']";

    /**
     * Selector for the order number
     * @type {String}
     */
    const orderNumberSelector = "//input[@name='id5']";

    /**
     * Selector for the reg number
     * @type {String}
     */
    const regNumberSelector = "//input[@name='id6']";

    /**
     * Selector for the from number
     * @type {String}
     */
    const orderTotalFromSelector = "//input[1][@class[contains(.,'range-from')]]";

    /**
     * Selector for the to number
     * @type {String}
     */
    const orderTotalToSelector = "//input[1][@class[contains(.,'range-to')]]";

    /**
     * Selector for the manager id number
     * @type {String}
     */
    const mgrIdSelector = "//input[@name='id62']";

    /**
     * Selector for the customer id number
     * @type {String}
     */
    const custIdSelector = "//input[@name='id75']";

    /**
     * Selector for the customer id number
     * @type {String}
     */
    const primTenderAcctSelector = "//input[@name='id115']";

    /**
     * Selector for the Primary Tender Type
     * @type {String}
     */
    const primTenderTypeSelector = "//*[@placeholder='Primary Tender Type']";

    /**
     * Selector for the Primary Tender Type option
     * @type {String}
     */
    const primTenderTypeOptionSelector = "//md-option[@ng-repeat='pred in filter.PredefinedValues'][.='" + primTenderType + "']";

    /**
     * Selector for the customer id number
     * @type {String}
     */
    const billingCustAddressSelector = "//input[@name='id233']";

    /**
     * Selector for the trx id number
     * @type {String}
     */
    const trxSelector = "//input[@name='id943']";

    if (transactionTime != null) {
        //Select transaction date-time
        // console.log(transactionTime);
        await waitForDisplayed(transactionTimeSelector);
        await checkIfElementExists(transactionTimeSelector);
        await clickElement('click','element',transactionTimeSelector);
        await pause(1000);
        await waitForDisplayed(transactionTimeOptionSelector);
        await checkIfElementExists(transactionTimeOptionSelector);
        await clickElement('click','element',transactionTimeOptionSelector);
    }
    if (store != null) {
        // console.log(store);
        //Store
        await waitForDisplayed(storeSelector);
        await checkIfElementExists(storeSelector);
        await setInputfield('set',store,storeSelector);
        pressButton('Enter');
    }
    
    if (associateNumber != null) {
        // console.log(associateNumber);
        //Associate Number
        await waitForDisplayed(associateNumberSelector);
        await checkIfElementExists(associateNumberSelector);
        await setInputfield('set',associateNumber,associateNumberSelector);
    }

    if (orderNumber != null) {
        // console.log(orderNumber);
        //Order Number
        await waitForDisplayed(orderNumberSelector);
        await checkIfElementExists(orderNumberSelector);
        await setInputfield('set',orderNumber,orderNumberSelector);
    }

    if (Reg != null) {
        // console.log(Reg);
        //Reg Number
        await waitForDisplayed(regNumberSelector);
        await checkIfElementExists(regNumberSelector);
        await setInputfield('set', Reg, regNumberSelector);
    }   

    if (orderTotalFrom != null) {
        // console.log(orderTotalFrom);
        //From Number
        await waitForDisplayed(orderTotalFromSelector);
        await checkIfElementExists(orderTotalFromSelector);
        await setInputfield('add', orderTotalFrom, orderTotalFromSelector);
    }

    if (orderTotalTo != null) {
        // console.log(orderTotalTo);
        //To Number
        await waitForDisplayed(orderTotalToSelector);
        await checkIfElementExists(orderTotalToSelector);
        await setInputfield('add', orderTotalTo, orderTotalToSelector);
    }

    if (mgrId != null) {
        //Manager Id
        await waitForDisplayed(mgrIdSelector);
        await checkIfElementExists(mgrIdSelector);
        await setInputfield('set', mgrId, mgrIdSelector);
    }

    if (custId != null) {
        //Customer Id
        await waitForDisplayed(custIdSelector);
        await checkIfElementExists(custIdSelector);
        await setInputfield('set', custId, custIdSelector);
    }

    if (primTenderAcct != null) {
        //Primary Tender Account
        await waitForDisplayed(primTenderAcctSelector);
        await checkIfElementExists(primTenderAcctSelector);
        await setInputfield('set', primTenderAcct, primTenderAcctSelector);
    }

    if (primTenderType != null) {
        //Select Primary Tender Type
        await waitForDisplayed(primTenderTypeSelector);
        await checkIfElementExists(primTenderTypeSelector);
        await clickElement('click','element',primTenderTypeSelector);
        await pause(1000);
        await waitForDisplayed(primTenderTypeOptionSelector);
        await checkIfElementExists(primTenderTypeOptionSelector);
        await clickElement('click','element',primTenderTypeOptionSelector);
    }

    if (billCustAdd != null) {
        //Billing Customer Address
        await waitForDisplayed(billingCustAddressSelector);
        await checkIfElementExists(billingCustAddressSelector);
        await setInputfield('set', billCustAdd, billingCustAddressSelector);
    }

    if (trx != null) {
        //Trx UPC
        await waitForDisplayed(trxSelector);
        await checkIfElementExists(trxSelector);
        await setInputfield('set', trx, trxSelector);
    }
};