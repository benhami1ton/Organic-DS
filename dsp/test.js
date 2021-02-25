// Required packages to manipulate JSON files
const fse = require("fs-extra");
const glob = require("glob");
const path = require("path");

// Required packages to build via Style Dictionary
const StyleDictionary = require("style-dictionary");
const tokens = require("./dsp/data/json/core");

// Insert the files in the data/json folder to an array
const allFiles = glob.sync("dsp/data/json/*.json");

// Define the categories that we will be sorting the files into
const tokenCategories = ["core", "theme"];

// For each category, create an object containing the files matching that category
const separateFilesByCat = tokenCategories.map(function (category) {
  // define temporary variable that holds an object with the category and an array of all files matching the category
  const iterativeCat = {
    [category]: allFiles
      .filter((file) => file.includes(category))
      .map(function (filteredFile) {
        // deconstruct each path into its relative parts, for easier consumption/manipulation later
        const parsedFile = path.parse(filteredFile);
        // return freshly deconstructed path details to the parent array
        return parsedFile;
      }),
  };
  // return temporary object to the parent array
  return iterativeCat;
});

// Create a fixed object with the sorted token files, to make it easier to reference later
const tokenFiles = {
  // Referencing both the index of the array, and the key of the interior object
  coreFiles: separateFilesByCat[0].core,
  themeFiles: separateFilesByCat[1].theme,
};

// Define a function that will move/manipulate the files based on category
function moveFiles() {
  tokenFiles.coreFiles.forEach((fileObj) => {
    // Remove the 'core' name from the file
    const rootName = fileObj.base.slice(4);
    // Define old path in a string, using the path.dir and the path.base
    const oldPath = `${fileObj.dir}/${fileObj.base}`;
    // Define new path for the core files
    const newPath = `${fileObj.dir}/core/${rootName}`;
    // use fs-extra module to move core files
    fse.rename(oldPath, newPath, (err) => {
      if (err) throw err;
      console.log(`Core file: ${rootName} has been moved!`);
    });
  });
  tokenFiles.themeFiles.forEach((fileObj) => {
    // Remove the 'theme' name from the file
    const rootName = fileObj.base.slice(5);
    // Define old path in a string, using the path.dir and the path.base
    const oldPath = `${fileObj.dir}/${fileObj.base}`;
    // Define new path for the theme files
    const newPath = `${fileObj.dir}/theme/${rootName}`;
    // use fs-extra module to move core files
    fse.rename(oldPath, newPath, (err) => {
      if (err) throw err;
      console.log(`Theme file: ${rootName} has been moved!`);
    });
  });
}

moveFiles();
