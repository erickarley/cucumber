/**
 * Saves the data on the detail view
 * @param  {String}   filterName  Filter of the query
 * @param  {Number}   rowNumber   RowNumber selected
 */
export default async(searchCriteria, filterName, rowNumber) => {
    const fs = require('fs'); 
    let htmlOnDetailView = '';
    //let valuesOnDetailView = '';
    let numberOfResults = await $("//div[@ng-if='!controller.querySharedService.state.isEditMode']//span[contains(.,'Results: ')]").getText();
    // console.log(searchCriteria + '-' + filterName + ' - ' + numberOfResults);
    if (numberOfResults.search('( Results: 0 )') == -1) { 
    //     // const loadingGifSelector = "//div[@class='agilence-receipt agilence-receipt-v2 agilence-receipt-container with-padding']/md-progress-circular";
    //     // waitFor(loadingGifSelector,hugePause,false,'exist');
        // valuesOnDetailView = await $("//*[@class='receipt']").getText();
        htmlOnDetailView = await $("//*[@class='receipt']").getHTML(false);

        //htmlOnDetailView = "<html><body>" + htmlOnDetailView + "</body></html>"
        //console.log('Number of elements on Detail View' + valuesOnDetailView.length);
        //console.log('Elements on Detail View' + valuesOnDetailView);
        
    }
    else {
        // valuesOnDetailView = 'NO RESULTS';
        htmlOnDetailView = '<b>NO RESULTS</b>';
    }

    filterName = filterName.replace(/\//g,'-')
    let fileName = './IntegrationResults/DetailView-' + searchCriteria + '-' + filterName + '-' + rowNumber;
    //Save Text file
    // fs.writeFile(fileName + '.txt', valuesOnDetailView, (err) => { 
        
    //     // In case of a error throw err. 
    //     if (err) throw err; 
    // })

    htmlOnDetailView = "<html><body>" + htmlOnDetailView + "</body></html>"
    //Save HTML
    fs.writeFile(fileName + '.html', htmlOnDetailView, (err) => { 
    
        // In case of a error throw err. 
        if (err) throw err; 
    })
};
