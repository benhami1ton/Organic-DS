const glob = require("glob");
const {
    get
} = require("https");
const path = require("path")

let filepath = "dsp/data/core/json/**/*.json";
var catNames = [];

// Searches through specific path, finds all files matching, and returns to an array

    files = glob(filepath,
        function (er, tokenpaths) {
            // Manipulates array to remove folders and file type, as well as removing the 'start' file
            const filenames = tokenpaths.map(file => path.basename(file, '.json')).filter(file => file != 'start');
            // console.log(filenames);
            return filenames;

        }
        );

        console.log(files);