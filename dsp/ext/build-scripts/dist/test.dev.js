"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Required packages to run this script, 
var fse = require("fs-extra");

var glob = require("glob");

var path = require("path"); // Insert the files in the data/json folder to an array


var allFiles = glob.sync("dsp/data/json/*.json"); // Define the categories that we will be sorting the files into

var tokenCategories = ["core", "theme"]; // For each category, create an object containing the files matching that category

var separateFilesByCat = tokenCategories.map(function (category) {
  // define temporary variable that holds an object with the category and an array of all files matching the category
  var iterativeCat = _defineProperty({}, category, allFiles.filter(function (file) {
    return file.includes(category);
  }).map(function (filteredFile) {
    // deconstruct each path into its relative parts, for easier consumption/manipulation later
    var parsedFile = path.parse(filteredFile); // return freshly deconstructed path details to the parent array

    return parsedFile;
  })); // return temporary object to the parent array


  return iterativeCat;
}); // Create a fixed object with the sorted token files, to make it easier to reference later

var tokenFiles = {
  // Referencing both the index of the array, and the key of the interior object
  coreFiles: separateFilesByCat[0].core,
  themeFiles: separateFilesByCat[1].theme
}; // Define a function that will move/manipulate the files based on category

function moveFiles() {
  tokenFiles.coreFiles.forEach(function (fileObj) {
    // Remove the 'core' name from the file
    var rootName = fileObj.base.slice(4); // Define old path in a string, using the path.dir and the path.base

    var oldPath = "".concat(fileObj.dir, "/").concat(fileObj.base); // Define new path for the core files

    var newPath = "".concat(fileObj.dir, "/core/").concat(rootName); // use fs-extra module to move core files

    fse.rename(oldPath, newPath, function (err) {
      if (err) throw err;
      console.log("Core file: ".concat(rootName, " has been moved!"));
    });
  });
  tokenFiles.themeFiles.forEach(function (fileObj) {
    // Remove the 'theme' name from the file
    var rootName = fileObj.base.slice(5); // Define old path in a string, using the path.dir and the path.base

    var oldPath = "".concat(fileObj.dir, "/").concat(fileObj.base); // Define new path for the theme files

    var newPath = "".concat(fileObj.dir, "/theme/").concat(rootName); // use fs-extra module to move core files

    fse.rename(oldPath, newPath, function (err) {
      if (err) throw err;
      console.log("Theme file: ".concat(rootName, " has been moved!"));
    });
  });
}

moveFiles();