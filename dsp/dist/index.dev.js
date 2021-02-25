"use strict";

var _require = require("./readTokenDir"),
    readTokenFiles = _require.readTokenFiles,
    getTokenSystems = _require.getTokenSystems;

var _require2 = require("./stratosClean"),
    separateFilesByCat = _require2.separateFilesByCat; // Run cleaning functions to sort Stratos generated files into a better org system


separateFilesByCat();
var coreTokens = readTokenFiles("dsp/data/json/core");
var themeTokens = readTokenFiles("dsp/data/json/theme");
module.exports = {
  source: ["dsp/data/json/**/*.json"],
  platforms: {
    // WEB OUTPUT
    // Full Tokens File
    "Web | SCSS | Core Variables": {
      transformGroup: "scss",
      buildPath: "dsp/dist/web/scss/00_tokens/",
      files: [{
        destination: "ods-tokens.scss",
        format: "scss/variables"
      }]
    },
    // Recursive SCSS output for Sketch Importing
    // Core Tokens
    "scss/core token maps": {
      transformGroup: "scss",
      buildPath: "dsp/data/scss/core/",
      files: coreTokens.map(function (tokenFileObj) {
        return {
          destination: "_ods-core-".concat(tokenFileObj.name, ".scss"),
          format: "scss/map-deep",
          filter: {
            attributes: {
              category: tokenFileObj.name,
              type: "core"
            }
          }
        };
      })
    },
    "scss/core token variables": {
      transformGroup: "scss",
      buildPath: "dsp/dist/web/scss/00_tokens/",
      files: coreTokens.map(function (tokenFileObj) {
        return {
          destination: "_ods-core-".concat(tokenFileObj.name, ".scss"),
          format: "scss/variables",
          filter: {
            attributes: {
              category: tokenFileObj.name,
              type: "core"
            }
          },
          options: {
            // Look here 👇
            outputReferences: true
          }
        };
      })
    }
  }
};