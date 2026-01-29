require('colors');
const Diff = require('diff');

function compare(textA, textB) {
    const diff = Diff.diffChars(textA, textB);

    const results = {
        same: diff.length === 1,
        differences: diff.length > 1 ? diff.length - 1 : 0,
        textDiff: diff.reduce((t, part) => {
            let color = part.added ? 'green' :
                part.removed ? 'red' : 'grey';
            return t + part.value[color];
        }, '')
        /*htmlDiff: diff.reduce((html, part) => {
            let color = part.added ? 'green' :
                part.removed ? 'red' : 'grey';
            return html += `<span style="color: await ${color}">${part.value}</span>`;
        }, '')*/
    };

    // diff.forEach(part => console.log('part ->', part));

    let print = {...results};
    delete print.textDiff
    console.table(print);
};
