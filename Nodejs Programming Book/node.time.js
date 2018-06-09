console.time("a")
var output = 1;

for(var i =0; i<=10; i++){
    output *= i
}
console.timeEnd("a")
console.log(output)
