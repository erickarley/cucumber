import path from 'path';
import {config as buildConfig} from './wdio.conf';

// This config file expects a server parameter to be passed (which should always be the case with the deployment validation tests)
buildConfig.outputDir = path.join(__dirname, '/logs/' + process.argv.find(arg => arg.startsWith('server=')).replace('server=',''));

export const config = buildConfig;