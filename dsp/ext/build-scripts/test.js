const fse = require("fs-extra");
const glob = require("glob");
const path = require("path");




// Searches through specific path, finds all files matching, and returns to an array

// const coreFiles = function () {
//     glob("dsp/data/json/*.json", function (er, tokenpaths) {
//         // Manipulates array to remove folders and file type, as well as removing the 'start' file
//         // files = tokenpaths.map(file => path.basename(file, '.json')).filter(file => file != 'start');
//         // console.log(files);
//         files = tokenpaths.map(file => path.basename(file, '.json')).filter(file => file != 'start');
//         return files;
//     })
// };

// Insert the files in the data/json folder to a Path-parsed object
const allFiles = glob.sync("dsp/data/json/*.json");



const coreFiles = allFiles.filter(file => file.includes("core"));
const themeFiles = allFiles.filter(file => file.includes("theme"));

// Map a new array with the file paths only, removing the basename
const fileLoc = allFiles.map(function (file) {
    return path.dirname(file)
});

const moveCore = function () {
    coreFiles.forEach(file => {
        const dirName = path.dirname(file);
        const baseName = path.basename(file);
        const newPath = `${dirName}/core/${baseName}`;
        fse.rename(file, newPath, (err) => {
            if (err) throw err;
            console.log(`Rename of ${file} complete!`);
          });
    })
}

moveCore();

// // Map a new array with just the basenames of the files
// const coreBasenames = allFiles.map(file => path.basename(file)).filter(file => file != 'start');

console.log("All Paths");
console.log(allFiles);

console.log("All - Just Paths");
console.log(fileLoc);

// console.log("All - Just Filenames");
// console.log(coreBasenames);

console.log("Core Files");
console.log(coreFiles);

console.log("Theme Files");
console.log(themeFiles);