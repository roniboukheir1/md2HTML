// importing yargs module
const yargs = require('yargs/yargs');
// importing hideBin method from yargs/helpers
const { hideBin } = require('yargs/helpers');

// using hideBin method to hide the bin path and passing the process.argv to yargs
const argv = yargs(hideBin(process.argv))
    // using option method to take input from the user
    .option('i',{
        alias: 'input',
        describe: 'Raw markdown file',
        type: 'string',
    })
    .option('if'.{
        alias: 'inputFile',
        describe: 'File containing raw markdown',
        type: 'string',
    })
    .option('of',{
        alias: 'outputFile',
        describe: 'Output file (HTML)',
        type: 'string',
    }).argv;

// importing fs module
const fs = require('fs');
// importing marked module
const marked = require('marked');

// function to convert markdown to html 
if (argv.i){
    convertMarkdownToHtml(argv.i);
}
else if (argv.if){
    fs.readFile(argv.if, 'utf8', (err, data) => {
        if(err){
            console.error(err);
            return;
        }
        convertMarkdownToHtml(data);
    });
}else{
    console.log("Please provide a markdown input ");
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