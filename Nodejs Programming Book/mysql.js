var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.locals.pretty = true;

app.use(bodyParser.urlencoded({extended : false}))

app.set("view engine", "jade");
app.set("views", "views");

var mysql = require("mysql");
var conn = mysql.createConnection({
  user: "root",
  password: "satul213",
  port: 3306,
  database: "Company"
});
conn.connect();

app.get("/", (req, res) => {
  var sql = "select * from products";
  conn.query(sql, function(err, results) {
    console.log(results)
    res.render("list", { results: results });
  });
});

app.get("/insert", (req, res) => {
  res.render("insert");
});

app.post("/insert", (req, res) => {
  var sql = "insert into products(name, modelnumber, series) values(?,?,?)";
  conn.query(sql, [req.body.name, req.body.mn, req.body.series], function(
    err,
    results
  ) {
    if (err) console.log("Error!");
    else {
      res.redirect("/");
    }
  });
});

app.get("/edit/:id", (req, res) => {
  var sql = "select * from products where id=?";
  conn.query(sql, [req.params.id], function(err, result) {
    if (err) console.log("Error");
    else {
      res.render("edit",{result : result[0]})
    }
  });
});

app.get("/delete/:id",(req,res)=>{
    var id = req.params.id
    var sql = "delete from products where id=?"
    conn.query(sql,[id],function(err,results){
        if(err) console.log("Error")
        else{
            res.redirect("/")
        }
    })


})

app.post("/edit/:id",(req,res)=>{
    var name = req.body.name
    var mn = req.body.mn
    var series = req.body.series
    var id = req.params.id

    var sql = "update products set name=?, modelnumber=?, series=? where id=?"
    
    conn.query(sql,[name,mn,series,id],function(err,results){
        console.log(results)
        res.redirect("/")
    })



})

app.listen(3000, function() {
  console.log("Connected 3000 port!");
});
