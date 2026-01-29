// const { executeQuery } = require('../Common/sqlServerUtils');
import sqlQueryExecutor from "../Common/sqlQueryExecutor";

/**
 * Update the dashboards matching the period
 */
 export default async() => {
    try { 
        //Number of days
        let userArguments = process.argv;
        const hasDays = (element) => element.indexOf('days') !== -1;
        const hasDaysParamIndex = userArguments.findIndex(hasDays);
        // 5 is the first character to read considering the length of the word "days:""
        let numberOfDays = 0;
        if(hasDaysParamIndex != -1 && userArguments[hasDaysParamIndex].length >= 5) {
            // 5 is the first character to read considering the length of the word "days:""
            numberOfDays = userArguments[hasDaysParamIndex].substring(5);
        }
        else {
            numberOfDays = "90";
        }
        console.log("Number of Days: " + numberOfDays);

        const query = "update [evGlobalConfig].[dbo].[Dashboard] " 
        + "set [public] = 1 " 
        + "where id in (SELECT d.id "
        + "FROM [evGlobalConfig].[dbo].[Dashboard] d "
        + "inner join [evGlobalConfig].[dbo].[DashboardLastRun] dlr on d.id = dlr.DashboardId "
        + "where dlr.LastRunDate > getdate()-" + Number(numberOfDays) + " " 
        + "group by d.id )"
        /**
         * The data to be returned
         * @type {String}
         */
        // const data = await executeQuery(queryToExecute);
        const data = await sqlQueryExecutor(query);

        // Your test logic using the fetched data
        // console.log('Fetched data:', data);
    } catch (err) {
        console.error(err);
    }
};
