import waitForDisplayed from '../../action/waitForDisplayed';
import select2020DropDown from '../../action/Common/select2020DropDown';
import pause from '../../action/pause';
import clickButton from '../../action/Common/clickButton';
import setInputField from '../../action/setInputField';
import clickElement from '../../action/clickElement';
import runDBQuery from '../../action/Common/runDBQuery';
import runAsyncDBQuery from '../../action/Common/runAsyncDBQuery';

/**
 * Checks that closing one alert increases the closed alerts number
 * @param  {Number}     cause          The cause option
 * @param  {Number}     resolution     The resolution option
 */
export default async(cause, resolution) => {
   /**
     * The selector for the closed alerts number
     * @type {String}
     */
    const selectorForClosedAlerts = "//div[.='Closed Alerts']/following-sibling::div";

    await waitForDisplayed(selectorForClosedAlerts);
    /**
     * The text from the closed alerts
     * @type {String}
     */
    const numberOfClosedAlerts = await $(selectorForClosedAlerts).getText();

    /**
     * Selector for the Cause drop down
     * @type {String}
     */
    const causeDropDownSelector = "//md-select[@ng-model='resolveAlertDialogController.selectedCause']";

    /**
     * Partial Selector for the STANDARD drop down option
     * @type {String}
     */
    const causeOptionSelector = "//md-option[@ng-repeat='cause in resolveAlertDialogController.causes'][.='" + cause +"']";

    /**
     * Selector for the Resolution drop down
     * @type {String}
     */
    const resolutionDropDownSelector = "//md-select[@ng-model='resolveAlertDialogController.selectedResolution']";

    /**
     * Partial Selector for the resolution drop down option
     * @type {String}
     */
    const resolutionOptionSelector = "//md-option[@ng-repeat='resolution in resolveAlertDialogController.resolutions'][.='" + resolution +"']";

    await clickButton('Close');
    await pause(1000);
    await select2020DropDown(causeDropDownSelector, causeOptionSelector, cause);
    await pause(2000);
    await setInputfield('add',"Automation Cause",'#employeeNotes');
    await pause(1000);
    await select2020DropDown(resolutionDropDownSelector, resolutionOptionSelector, resolution);
    await pause(2000);
    await setInputfield('add',"Automation Resolution",'#managerNotes');
    await pause(1000);
    //This is the Acknowledge switch
    await clickElement('click','element','//md-switch');
    await pause(1000);
    await clickButton('Submit');
    await pause(2000);
    expect(Number($(selectorForClosedAlerts).getText())).to.be.gt(Number(numberOfClosedAlerts));
    // //let recordset = runDBQuery("select UserName as UserName from Users where username='earley@agilenceinc.com'");
    // let recordset2 = runAsyncDBQuery("select UserName as UserName from Users where username='earley@agilenceinc.com'");
    // console.log(recordset2);
    return true;
    let result;
    runAsyncDBQuery("select UserName as UserName from Users where username='earley@agilenceinc.com'")
        .then(data => {
            //result = data;
            console.log(data.recordset[0].UserName);
            //expect(data.recordset[0].UserName).to.be("earley@agilenceinc.com");
            expect(data.recordset[0].UserName).to
            .equal(
                "gato@agilenceinc.com",
                `Error was found`
            );
        })
        .catch(err => console.log(err));
    //console.log('Alerts TEXT');
    //console.log(recordset);
    //console.log(recordset2);
    await pause(10000);
};
