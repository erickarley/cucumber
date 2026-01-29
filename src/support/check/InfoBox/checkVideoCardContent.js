import isExisting from '../isExisting';

/**
 * Check if the given string is in the video card content
 * @param  {String}   falseCase       Whether to check if the given string is in
 *                                    the column name path or not
 * @param  {String}   expectedCardContentText The string to check for
 */
export default async(falseCase, expectedCardContentText) => {
    /**
     * The card content selector
     * @type {String}
     */
    const expectedCardContentSelector = "//md-card-content[contains(.,'" + expectedCardContentText +"')]";
    
    await isExisting(expectedCardContentSelector,falseCase);
};
