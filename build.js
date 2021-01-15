const StyleDictionaryPackage = require('style-dictionary');

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

function getStyleDictionaryConfig(tokenCat) {
  return {
    "source": [
      `dsp/data/json/${tokenCat}/*.json`,
    ],
    "platforms": {
      "web": {
        "transformGroup": "web",
        "buildPath": `build/web/${tokenCat}/`,
        "files": [{
          "destination": `${tokenCat}.scss`,
          "format": "scss/variables"
        },
        {
            "destination": `${tokenCat}-map.scss`,
            "format": "scss/variables"
          }
    ]
      },
      "android": {
        "transformGroup": "android",
        "buildPath": `build/android/${tokenCat}/`,
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
        "buildPath": `build/ios/${tokenCat}/`,
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

['color', 'text', 'spacing'].map(function (tokenCat) {
  
    console.log('\n==============================================');
    console.log(`\nProcessing: [${tokenCat}]`);

    const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(tokenCat));

    StyleDictionary.buildAllPlatforms();
    

    console.log('\nEnd processing');

})

console.log('\n==============================================');
console.log('\nBuild completed!');