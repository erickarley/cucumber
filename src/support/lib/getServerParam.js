/**
 * Extracts the `server` CLI argument value
 * @returns {String} The server value
 */
export default function getServerParam() {
    const serverParam = process.argv.find(arg => arg.startsWith('server='));
    if (!serverParam) {
        console.error('[WDIO CONFIG] ❌ Missing required CLI argument: server=<value>');
        process.exit(1);
    }
    const serverValue = serverParam.split('=')[1];
    return serverValue;
}
