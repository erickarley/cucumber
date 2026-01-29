/**
 * Check the data of the table on a specific cell
 * @param  {String}     keyName   Id of the report stored
 * @param  {String}     cellNumber   previous env
 */
export default async(keyName, cellNumber) => {

    let keyFromStorage = browser.sharedStore.get(keyName);
    //console.log(keyFromStorage);
    keyFromStorage = keyFromStorage.replace(/},{/g,'---');
    keyFromStorage = keyFromStorage.replace(/["]/g,'');
    keyFromStorage = keyFromStorage.replace(/ReportName:/g,'');
    keyFromStorage = keyFromStorage.replace(/}/g,'');
    keyFromStorage = keyFromStorage.replace(/{/g,'');
    keyFromStorage = keyFromStorage.replace('[','');
    keyFromStorage = keyFromStorage.replace(']','');
    keyFromStorage = keyFromStorage.replace(/&amp;/g,'&');
    keyFromStorage = keyFromStorage.replace(/&lt;/g,'<');
    keyFromStorage = keyFromStorage.replace(/&gt;/g,'>');
    keyFromStorage = keyFromStorage.replace(/&gt;/g,'>');
    //Other possible changes
    // '"':"&quot;",
    // "'":"&apos;"};

    let stringArray = keyFromStorage.split('---');
    //console.log(stringArray.toString());
    console.log('Number of Elements on Data Fetcher: ' + stringArray.length);
    //stringArray.forEach(elementString => console.log(elementString));

    let valuesOnTableCells = await $$('//tr/td[' + cellNumber + ']/span')

    console.log('Number of Elements on Page: ' + valuesOnTableCells.length);

    let same_list;
    //valuesOnTableCells.forEach(element => console.log(element.getText()));
    valuesOnTableCells.forEach(compareResults)
    console.log('Are reports lists exactly identical? ' + same_list);

    function compareResults(item, index, arr) {
        if (arr[index].getText() ==  stringArray[index]) {
            //console.log('Values are Identical');
            if ((arr.length == index+1) && (same_list != false)) {
                same_list = true;
            }
        }
        else{
            console.log('Extracted from 2020: ' + arr[index].getText() + ' // From Data Fetcher: ' + stringArray[index]);
            console.log('***Values are Different***');
            same_list = false;
        }    
    }
    expect(same_list).to.be.true;
};
    