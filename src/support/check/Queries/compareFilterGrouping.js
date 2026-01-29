/**
 * Check the data of the table for grouping on predefined filters
 * @param  {String}     filterName   previous env
 */
export default async(filterName) => {

    let keyFromStorage = browser.sharedStore.get('optionsFor'+filterName);

    let valuesOnTableCells = await $$('//td[2]//span');

    let listOfGroups = [];
    valuesOnTableCells.forEach(element => listOfGroups.push(element.getText()));

    console.log('Number of groups on table: ' + valuesOnTableCells.length);

    let same_list = true;

    keyFromStorage.forEach(compareResults);
    console.log('Are all selected values shown in the results? ' + same_list);

    function compareResults(item, index, arr) {
        if (listOfGroups.indexOf(arr[index]) != -1 ) {
            console.log('Option displayed: ' + arr[index]);
        }
        else{
            console.log('Option missing for Filter ' + filterName + ': ' + arr[index]);
            same_list = false;
        }    
    }
    expect(same_list).to.be.true;
};
    