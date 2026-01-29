import pause from '../pause';
import { config } from '../../constants';

export default async(queryToExecute) => {
    var sql = require('mssql/msnodesqlv8');
    sql.connect(config, function(err) {
        var request = new sql.Request();
        console.log(err);
        request.query(queryToExecute, function(err, recordset) {
            console.log(err);
            return recordset;
        });
    });
    await pause(10000);
};

