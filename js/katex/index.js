var arguments = process.argv.splice(2);
// console.log('所传递的参数是：', arguments[0]);

const katex = require('katex');
var html = katex.renderToString("c = \\pm\\sqrt{a^2 + b^2}");
// "c = \\pm\\sqrt{a^2 + b^2}"
console.log(html)