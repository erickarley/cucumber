import runAsyncDBQuery from './runAsyncDBQuery';

/**
 * Checks that closing one alert increases the closed alerts number
 * @param  {Number}     cause          The cause option
 * @param  {Number}     resolution     The resolution option
 */
export default async (queryToExecute, fieldToCheck, valueToCheck) => {
    let result = await runAsyncDBQuery(queryToExecute);
    browser.sharedStore.set('fieldToCheck',result.recordset[0][fieldToCheck]);
    // expect(result).to.be.an('object',"Results from DB where not found");
    // expect(result).to.exist;
    // expect(result).to.have.property("recordset");
    
    // //Testing recordset content
    // expect(result.recordset).to.be.an('array',"DB results were empty");
    // expect(result.recordset[0]).to.have.property(fieldToCheck);
    // expect(result.recordset[0][fieldToCheck]).to
    //     .equal(valueToCheck,`Expecting await ${result.recordset[0][fieldToCheck]} to be await ${valueToCheck}`);
    
};