const { readTokenFiles, getTokenSystems } = require("./readTokenDir");
const { separateFilesByCat } = require("./stratosClean");

// Run cleaning functions to sort Stratos generated files into a better org system
separateFilesByCat();

const coreTokens = readTokenFiles("dsp/data/json/core");
const themeTokens = readTokenFiles("dsp/data/json/theme");

module.exports = {
  source: ["dsp/data/json/**/*.json"],
  platforms: {
    // WEB OUTPUT
    // Full Tokens File
    "Web | SCSS | Core Variables": {
      transformGroup: "scss",
      buildPath: `dsp/dist/web/scss/00_tokens/`,
      files: [
        {
          destination: `ods-tokens.scss`,
          format: "scss/variables",
        },
      ],
    },

    // Recursive SCSS output for Sketch Importing
    // Core Tokens
    "scss/core token maps": {
      transformGroup: "scss",
      buildPath: `dsp/data/scss/core/`,
      files: coreTokens.map((tokenFileObj) => ({
        destination: `_ods-core-${tokenFileObj.name}.scss`,
        format: "scss/map-deep",
        filter: {
          attributes: {
            category: tokenFileObj.name,
            type: "core",
          },
        },
      })),
    },
    "scss/core token variables": {
      transformGroup: "scss",
      buildPath: `dsp/dist/web/scss/00_tokens/`,
      files: coreTokens.map((tokenFileObj) => ({
        destination: `_ods-core-${tokenFileObj.name}.scss`,
        format: "scss/variables",
        filter: {
          attributes: {
            category: tokenFileObj.name,
            type: "core",
          },
        },
        options: {
          // Look here 👇
          outputReferences: true,
        },
      })),
    },
  },
};
