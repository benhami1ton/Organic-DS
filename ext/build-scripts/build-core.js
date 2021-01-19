const StyleDictionaryPackage = require('style-dictionary');

const buildCategories = ['color', 'text', 'spacing', 'elevation'];

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

function getStyleDictionaryConfig(tokenCat) {
  return {
    "source": [
      `dsp/data/json/${tokenCat}/*.json`,
    ],
    "platforms": {
      "web": {
        "transformGroup": "web",
        "buildPath": `dsp/dist/web/core/${tokenCat}/`,
        "files": [{
          "destination": `_${tokenCat}.scss`,
          "format": "scss/variables"
        },
        {
            "destination": `_${tokenCat}-map.scss`,
            "format": "scss/map-deep"
          }
    ]
      },
      "android": {
        "transformGroup": "android",
        "buildPath": `dsp/dist/android/core/${tokenCat}/`,
        "files": [{
          "destination": "tokens.colors.xml",
          "format": "android/colors"
        },{
          "destination": "tokens.dimens.xml",
          "format": "android/dimens"
        },{
          "destination": "tokens.font_dimens.xml",
          "format": "android/fontDimens"
        }]
      },
      "ios": {
        "transformGroup": "ios",
        "buildPath": `dsp/dist/ios/core/${tokenCat}/`,
        "files": [{
          "destination": "tokens.h",
          "format": "ios/macros"
        }]
      }
    }
  };
}

console.log('Build started...');

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN tokenCatS AND PLATFORMS

buildCategories.map(function (tokenCat) {
  
    console.log('\n==============================================');
    console.log(`\nProcessing: [${tokenCat}]`);

    const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(tokenCat));

    StyleDictionary.buildAllPlatforms();
    

    console.log('\nEnd processing');

})

console.log('\n==============================================');
console.log('\nBuild completed!');