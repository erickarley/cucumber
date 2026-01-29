
/**
 * Stores the list of dashboards,reports, queries in memory
 * @param {String} objectType The type of object to be stored
 */
export default async(objectType) => {
    const scriptSelector14 = "//head/script[14]";
    const scriptSelector18 = "//head/script[18]";
    
    let elementToFind14 = await $(scriptSelector14);
    let elementToFind18 = await $(scriptSelector18);
    
    let elementToFind = null;
    
    if (elementToFind14) {
        let text14 = await elementToFind14.getText();
        let count14 = (text14.match(/"EntityId":/g) || []).length;
    
        if (count14 > 0) {
            elementToFind = elementToFind14;
        }
    }
    
    if (!elementToFind && elementToFind18) {
        elementToFind = elementToFind18;
    }
    
    if (elementToFind) {
        let text = await elementToFind.getText();
        let entityIdRegex = "EntityId";
        let count = (text.match(/"EntityId":/g) || []).length;
        console.log("Count of objects: " + count);
    
        if (count > 0) {
            let matches = text.split(entityIdRegex);
            let entityIds = [];
    
            for (let i = 1; i < matches.length - 1; i++) {
                entityIds.push(matches[i].substring(2, matches[i].indexOf(",")));
            }
    
            await browser.sharedStore.set(objectType, entityIds);
        } else {
            console.log("No entities found");
        }
    } else {
        console.log("Script not found with EntityId content in either section 14 or 18");
    }
};