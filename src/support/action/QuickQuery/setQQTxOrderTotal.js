import setInputfield from '../setInputField';
import waitForDisplayed from '../waitForDisplayed';

/**
 * Selects a widget
 * @param  {String}   orderTotalFrom   Transaction order total from
 * @param  {String}   orderTotalTo         Transaction order total To
 */
export default async (orderTotalFrom, orderTotalTo) => {
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

    if (orderTotalFrom != null) {
        // console.log(orderTotalFrom);
        //From Number
        await waitForDisplayed(orderTotalFromSelector);
        await setInputfield('add', orderTotalFrom, orderTotalFromSelector);
    }

    if (orderTotalTo != null) {
        // console.log(orderTotalTo);
        //To Number
        await waitForDisplayed(orderTotalToSelector);
        await setInputfield('add', orderTotalTo, orderTotalToSelector);
    }
};