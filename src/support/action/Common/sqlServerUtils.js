const sql = require('mssql/msnodesqlv8');

async function executeQuery(config, query) {
    try {
        console.log(config);
        const pool = await sql.connect(config);
        const result = await pool.request().query(query);
        return result.recordset;
    } catch (err) {
        throw new Error(`Error executing SQL query: ${err.message}`);
    } finally {
        await sql.close();
    }
}

module.exports = {
    executeQuery,
};