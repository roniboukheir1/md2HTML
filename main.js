// importing yargs module
const yargs = require('yargs/yargs');
// importing hideBin method from yargs/helpers
const { hideBin } = require('yargs/helpers');

// parsing CLI arguments
const argv = yargs(hideBin(process.argv))
    // using option method to take input from the user
    .option('i',{
        alias: 'input',
        describe: 'Raw markdown file',
        type: 'string',
    })
    .option('if',{
        alias: 'inputFile',
        describe: 'File containing raw markdown',
        type: 'string',
    })
    .option('of',{
        alias: 'outputFile',
        describe: 'Output file path (HTML). If not provided, defaults to the input file name with .html extension',
        type: 'string',
    }).argv;

// importing fs module
const fs = require('fs');

function getOutputFileName(inputFileName){
    return inputFileName.replace(/\.[^/.]+$/, '') + '.html';
}
function convertMarkdownToHtml(data){

    var html = data;

    // headings
    html = html.replace(/^(#{1,6})\s*(.+)/gm, (match, hashes, content) => {
    let level = hashes.length;
    return `<h${level}>${content}</h${level}>`;
    });
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');
    // image
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');
    // link
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    return html;
}

function writeHtmlToFileorConsole(html, outputFileName){

    if(outputFileName){
        fs.writeFile(outputFileName, html, (err) => {
            if(err){
                console.error(err);
                return;
            }
            console.log(`HTML written to ${outputFileName}`);
        });
    }
    else{
        console.log(html);
    }
}


// function to convert markdown to html 
if (argv.i){

    const html = convertMarkdownToHtml(argv.i);
    writeHtmlToFileorConsole(html, argv.of);
}
else if (argv.if){
    fs.readFile(argv.if, 'utf8', (err, data) => {
        if(err){
            console.error(err);
            return;
        }
        const html = convertMarkdownToHtml(data);
        const outputFileName = argv.of || getOutputFileName(argv.if);
        writeHtmlToFileorConsole(html, outputFileName);

    });
}else{
    console.log("Please provide a markdown input ");
}