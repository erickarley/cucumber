import sqlQueryExecutor from "../Common/sqlQueryExecutor";

/**
 * Grab the Query ids matching the period
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

        //TODO: Handle the case where days is empty

        const query = "SELECT q.id " 
        + "FROM [evGlobalConfig].[dbo].[Query] q "
        + "inner join [evGlobalConfig].[dbo].[QueryLastRun] qlr on q.id = qlr.QueryId "
        + "where qlr.LastRunDate > getdate()-" + Number(numberOfDays) + " and q.[deleted] = 0 and q.[disabled] = 0 " 
        + "group by q.id"
        /**
         * The data to be returned
         * @type {String}
         */
        // const data = await executeQuery(queryToExecute);
        const data = await sqlQueryExecutor(query);

        const arrayOfStrings = data.map(item => String(item.id));

        console.log(arrayOfStrings);
        await browser.sharedStore.set('queries', arrayOfStrings);

    } catch (err) {
        console.error(err);
    }
};
