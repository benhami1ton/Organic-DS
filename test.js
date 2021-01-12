const glob = require("glob");
const path = require("path")

// Searches through specific path, finds all files matching, and returns to an array
glob("dsp/data/**/*.json", function (er, tokenpaths) {
    // Manipulates array to remove folders and file type, as well as removing the 'start' file
    let filenames = tokenpaths.map(file => path.basename(file, '.json')).filter(file => file != 'start');
    return filenames;
});

let test = filenames;

console.log(test);