/**
 * Check if the given element has the given attribute
 * @param  {String}   selector          Element selector
 * @param  {String}   falseCase         Whether to check for the class to exist
 *                                      or not ('has', 'does not have')
 * @param  {String}   expectedAttributeName The attribute name to check
 */
export default async (selector, falseCase, attributeName) => {
    const element = await $(selector);
    
    if (falseCase === 'does not have') {
        await expect(element).not.toHaveAttribute(attributeName);
    } else {
        await expect(element).toHaveAttribute(attributeName);
    }
};
