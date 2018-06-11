require("http").createServer((req,res)=>{

    if(req.url == '/'){
        res.end("Hi!")
    }else{
        error.error.error();
    }

}).listen(3000,function(){
    console.log("q")
})