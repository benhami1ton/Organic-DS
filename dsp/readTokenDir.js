const { readdirSync, statSync } = require("fs-extra");
const path = require("path");

const getTokenSystems = (tokensLocation = "dsp/data/json") =>
  readdirSync(tokensLocation).filter(
    (folder) =>
      statSync(path.join(tokensLocation, folder)).isDirectory() === true
  );

const readTokenFiles = (fileLocation) =>
  readdirSync(fileLocation)
    .filter((file) => statSync(path.join(fileLocation, file)).isFile() === true)
    .map((file) => {
      const parsedFile = path.parse(path.join(fileLocation, file));

      return parsedFile;
    });

exports.readTokenFiles = readTokenFiles;
exports.getTokenSystems = getTokenSystems;
