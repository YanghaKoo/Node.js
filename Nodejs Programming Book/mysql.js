var express = require("express")
var app = express();
var bodyParser = require("body-parser")
app.locals.pretty = true;

app.use(bodyParser())

app.set("view engine", "jade");
app.set("views", "views");
var mysql = require("mysql")
var conn = mysql.createConnection({
    user : "root",
    password : "satul213",
    port : 3306,
    database : "Company"
})
conn.connect();




app.get("/",(req,res)=>{
    var sql = "select * from products"
    conn.query(sql,function(err,results){
        
        console.log(results)

        res.render("list",{results : results})
    })
})





app.listen(3000,function(){
    console.log("a")
})