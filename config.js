const StyleDictionary = require("style-dictionary");
const tokens = require("./dsp/data/json");

module.exports = {
  source: ["./dsp/data/json/core/**/*.json"],
  platforms: {
    // Web output in scss format
    "full tokens": {
      transformGroup: "scss",
      buildPath: `build/scss/`,
      files: [
        {
          destination: `tokens.scss`,
          format: "scss/variables",
        },
      ],
    },
    // Web output in scss partialformat
    "scss/core": {
      transformGroup: "scss",
      buildPath: `build/scss/`,
      files: tokens.map((tokenCategory) => ({
        destination: `_${tokenCategory}.scss`,
        format: "scss/variables",
        filter: {
          attributes: {
            category: tokenCategory,
          },
        },
      })),
    },
    "scss/theme": {
      transformGroup: "scss",
      buildPath: `build2/scss/`,
      files: tokens.map((tokenCategory) => ({
        destination: `_${tokenCategory}.scss`,
        format: "scss/variables",
        filter: {
          attributes: {
            category: tokenCategory,
          },
        },
      })),
    },
  },
};


