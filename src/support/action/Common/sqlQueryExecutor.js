const { executeQuery } = require('./sqlServerUtils');

/**
 * Execute the SQL statement
 * @param  {String}   queryToExecute The Query to execute
 */
export default async(queryToExecute) => {
    try {  
        let userArguments = process.argv;
        const hasDBServer = (element) => element.indexOf('dbserver:') !== -1;
        const dbServerParamIndex = userArguments.findIndex(hasDBServer);
        // 9 is the first character to read considering the length of the word "dbserver:""
        let dbServer = userArguments[dbServerParamIndex].substring(9);
        console.log("DB Server: " + dbServer);

        const hasDBServer2 = (element2) => element2.indexOf('dbserver2:') !== -1;
        const dbServerParamIndex2 = userArguments.findIndex(hasDBServer2);
        // 10 is the first character to read considering the length of the word "dbserver2:""
        
        let dbServer2 = '';
        if (dbServerParamIndex2 != -1) {
            dbServer2 = userArguments[dbServerParamIndex2].substring(10);
            console.log("DB Server2: " + dbServer2);
        } 

        // Configuration for SQL Server connection
        const config = {
            server: dbServer,
            database: 'evGlobalConfig',
            options: {
                trustedConnection: true,
            },
        };

        // Call executeQuery with config and query
        /**
         * The data to be returned
         * @type {String}
         */
        const data = await executeQuery(config, queryToExecute);
        // console.log('Fetched data:', data);

        if (dbServerParamIndex2 != -1) {
            // Configuration for SQL Server connection
            const config2 = {
                server: dbServer2,
                database: 'evGlobalConfig',
                options: {
                    trustedConnection: true,
                },
            };
            const data2 = await executeQuery(config2, queryToExecute);
            // console.log('Fetched data:', data2);
        }
        return data;

    } catch (err) {
        console.error("DB Server not specified " + err.message);
        throw new Error("DB Server not specified " + err.message);

    }
};

