import path from 'path';
import { config as buildConfig } from './wdio.conf'; // Import your big base config

// Override specs (your selected .feature files for this run)
buildConfig.specs = [
    './src/features/pending/single system tests generator.feature',
    './src/features/comparisons/reportsSingleSystem.feature',
    './src/features/comparisons/queriesSingleSystem.feature',
    './src/features/comparisons/dashboardsSingleSystem.feature',
];

// Optional: Override outputDir dynamically if needed (example using server argument)
const serverArg = process.argv.find(arg => arg.startsWith('server='));
if (serverArg) {
    const server = serverArg.replace('server=', '');
    buildConfig.outputDir = path.join(__dirname, '/logs/' + server);
}

// Optional: Override base URL (if you want to hit a different environment for this file)
buildConfig.baseUrl = 'https://autodevelop3.agilenceqa.com';

// Export the final config
export const config = buildConfig;
