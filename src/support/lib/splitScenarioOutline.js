const fs = require('fs');
const path = require('path');

// Get command-line arguments
const chunkArg = process.argv.find(arg => arg.startsWith('--chunkSize='));
const typeArg = process.argv.find(arg => arg.startsWith('--type='));

const chunkSize = chunkArg ? parseInt(chunkArg.split('=')[1], 10) : 1;
const type = typeArg ? typeArg.split('=')[1] : null;

if (!type || !['reports', 'dashboards', 'queries'].includes(type)) {
    console.error("❌ Please provide a valid --type argument: reports, dashboards, or queries");
    process.exit(1);
}

const INPUT_FEATURE = `./src/features/comparisons/${type}Comparison.feature`; 
const OUTPUT_DIR = `./temp/features/${type}`;

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const original = fs.readFileSync(INPUT_FEATURE, 'utf-8');

const lines = original.split('\n');
const headerLines = [];
let examplesStart = false;
let scenarioBase = [];
let exampleHeaders = [];
const exampleRows = [];

for (let line of lines) {
    if (line.trim().startsWith('Examples:')) {
        examplesStart = true;
        continue;
    }

    if (!examplesStart) {
        headerLines.push(line);
        if (line.trim().startsWith('Scenario Outline:')) {
            scenarioBase.push(line);
        } else if (scenarioBase.length > 0) {
            scenarioBase.push(line);
        }
    } else {
        if (line.trim().startsWith('|')) {
            const values = line.trim().split('|').map(val => val.trim()).filter(Boolean);
            if (exampleHeaders.length === 0) {
                exampleHeaders = values;
            } else {
                exampleRows.push(values);
            }
        }
    }
}

const chunked = [];
for (let i = 0; i < exampleRows.length; i += chunkSize) {
    chunked.push(exampleRows.slice(i, i + chunkSize));
}

chunked.forEach((rows, index) => {
    const headerOnly = headerLines.filter(line => 
    line.trim().startsWith('Feature:') || 
    line.trim().startsWith('@') || 
    line.trim() === '' || 
    line.trim().startsWith('As ') || 
    line.trim().startsWith('I want')
    );

    const fileLines = [
        ...headerOnly,  // only the feature header + tags
        ...scenarioBase,  // the scenario outline body
        '',
        'Examples:',
        '  | ' + exampleHeaders.join(' | ') + ' |',
        ...rows.map(row => '  | ' + row.join(' | ') + ' |'),
        ''
    ];

    const outputFilePath = path.join(OUTPUT_DIR, `${type}_group_${index + 1}.feature`);
    fs.writeFileSync(outputFilePath, fileLines.join('\n'), 'utf-8');
    console.log(`✅ Written: ${outputFilePath}`);
});

console.log(`\n✅ Split ${exampleRows.length} examples into ${chunked.length} grouped '${type}' feature files (chunkSize=${chunkSize}).`);
