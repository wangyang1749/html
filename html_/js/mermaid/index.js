// import mermaid from 'mermaid.min.js'
const mermaid = require('./mermaid.js');

// mermaid.mermaidAPI.initialize({
//    startOnLoad:false
// });
// console.log("jjjjjjjjjj")
// var insertSvg = function(svgCode, bindFunctions){
//    console.log("jjjjjjjjjj")
//    console.log(svgCode)
//     element.innerHTML = svgCode;
// };
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;

mermaid.mermaidAPI.initialize({
   startOnLoad:false
});
 // Example of using the API
 var element = JSDOM;

 var insertSvg = function(svgCode, bindFunctions){
    console.log(svgCode)
     element.innerHTML = svgCode;
 };

 var graphDefinition = 'graph TB\na-->b';
 var graph = mermaid.mermaidAPI.render('graphDiv', graphDefinition, insertSvg);