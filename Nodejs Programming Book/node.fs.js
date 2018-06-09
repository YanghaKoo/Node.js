var fs = require("fs")

fs.readFile("./Hai.txt","utf8",(err,data)=>{
    if(err) console.log("err")
    else console.log(data)
})

var data = "Hi, i`m Sukyung!"

fs.writeFile("./sk.txt",data,"utf8",(err)=>{
    if(err) console.log("err")
    else console.log("Completed")
})