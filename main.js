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
    // unordered list
    html = html.replace(/^\s*\*\s(.+)/gm, '<ul><li>$1</li></ul>');

    return html;
}

function writeHtmlToFileOrConsole(html, outputFileName){

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

// Main logic for converting markdown to HTML
console.log(argv);

if(argv.i){
    const html = convertMarkdownToHtml(argv.i);
    writeHtmlToFileOrConsole(html, argv.of);
}
else if (argv.f) {
  const inputFileName = Array.isArray(argv.f) ? argv.f[0] : argv.f;
  const outputFileName = argv.o ? (Array.isArray(argv.f) ? argv.f[1] : undefined) : argv.of;

  fs.readFile(inputFileName, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }
    const html = convertMarkdownToHtml(data);
    const outputFile = outputFileName || getOutputFileName(inputFileName);
    writeHtmlToFileOrConsole(html, outputFile);
  });
} else {
  console.log("Please provide a markdown input");
}
module.exports = convertMarkdownToHtml;