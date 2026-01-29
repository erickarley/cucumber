/**
 * Check the data of the table on a specific cell
 * @param  {String}     keyName   Id of the report stored
 * @param  {String}     keyValue   previous env
 * @param  {String}     falseCase false case
 */
//export default async(keyName, keyValue, falseCase, newEnvironment) => {
export default async(keyName, falseCase, keyValue) => {
 
    let keyFromStorage = browser.sharedStore.get(keyName);

    if (falseCase) {
        expect(keyFromStorage).to.not
            .equal(
                keyValue,
                `Expected value not to be "${keyValue}"`
            );
    } else {
        expect(keyFromStorage).to
            .equal(
                keyValue,
                `Expected value to be "${keyFromStorage}" but found "${keyValue}"`
            );
    }
};
 