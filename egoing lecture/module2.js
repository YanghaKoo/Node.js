var sum = require("./lib/sum")
//이 require가 sum.js의 module.exports의 함수로 치환이 되도록 약속됨
console.log(sum(1,2));



var cal = require('./lib/calculator')
console.log(cal.sum(1,2))
console.log(cal.avg(1,2))


