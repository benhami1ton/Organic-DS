const fs = require('fs-extra');
const { Sketch } = require('sketch-constructor');

const sketchFile = './Base_122820.sketch';
const jsonFile = './dist/styles.json';
fs.ensureDirSync('./dist');

console.log(`Reading sketch file: ${sketchFile}`);
Sketch.fromFile(sketchFile).then(sketch => {
  // Loop over the shared text styles in the document
  // Map them to a json declaration string
  // Join them into a single string with line breaks
  const json = sketch
    .getTextStyles()
    .map(sharedStyle => {
      const { textStyle } = sharedStyle.value;
      console.log(`Writing json declaration for: ${sharedStyle.name}`);
      return `"${sharedStyle.name}": {
  "color": "${textStyle.getColor().toRgbString()}",
  "font-size": "${textStyle.getFontSize()}px",
  "font-family": "${textStyle.getFontName()}",
},`;
    })
    .join('\n');

  // Write our json to a file
  console.log(`Writing json file: ${jsonFile}`);
  fs.writeFileSync(jsonFile, json);
});