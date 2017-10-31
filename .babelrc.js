// es2015 ?? env env??es??
//{
//  "presets": ["es2015", "stage-3", "react"],
//  "presets": ["env", "stage-3", "react"],
//  "compact" : false
//}
// ??????????
 // ??
var babelrc = {
  "presets": [
    "env",
    "react",
    "stage-1"
  ],
  "env": {
    "start": {
      "presets": [
        "react-hmre"
      ]
    }
  }
}