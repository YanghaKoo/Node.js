const express = require("express")
const app = express();





app.use(function(req,res){
    var output = [];
    for(var i = 0; i<3; i++){
        output.push({
            count : i,
            name : "name-" + i
        })
    }

    res.send(output)
})



app.listen(3000,function(){
    console.log("Cn")
})