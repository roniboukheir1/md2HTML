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
