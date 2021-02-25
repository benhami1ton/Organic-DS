const { readdirSync, statSync, rename } = require("fs-extra");
const glob = require("glob");
const { join, parse } = require("path");

// Use this to set the location of your tokens
const tokensLoc = "dsp/data/json";
const allFiles = glob.sync(`${tokensLoc}/*.json`);

const getTokenSystems = () =>
  readdirSync(tokensLoc).filter(
    (folder) => statSync(join(tokensLoc, folder)).isDirectory() === true
  );
const tokenSystems = getTokenSystems();

const separateFilesByCat = () => {
  tokenSystems.map((system) => {
    const fileObj = {
      [system]: allFiles
        .filter((file) => file.includes(system))
        .map((filteredFile) => {
          const parsedFile = parse(filteredFile);
          const tokenCategory = parsedFile.base.slice(system.length);
          const oldPath = `${parsedFile.dir}/${parsedFile.base}`;
          const newPath = `${parsedFile.dir}/${system}/${tokenCategory}`;

          rename(oldPath, newPath, (err) => {
            if (err) throw err;
            console.log(`${system} file: ${tokenCategory} has been moved!`);
          });
          // return freshly deconstructed path details to the parent array
          return parsedFile;
        }),
    };
    // return temporary object to the parent array
    return fileObj;
  });
  console.log(
    "\u001b[34m\n====================================\nStratos Tokens' mischief is managed.\n====================================\n\u001b[0m"
  );
};

exports.separateFilesByCat = separateFilesByCat;
