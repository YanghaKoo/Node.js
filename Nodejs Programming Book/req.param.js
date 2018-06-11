var express = require("express")
var app = express();

app.use((req,res)=>{
    var name = req.query.name
    var region = req.param('region')
    res.send(`<h1>${name}</h1> ${region}`)

})



app.listen(3000,function(){
    console.log("Connected 3000 port!")
})