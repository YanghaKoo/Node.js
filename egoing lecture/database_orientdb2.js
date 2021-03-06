var OrientDB = require('orientjs')
var server = OrientDB({
    host : "localhost",
    port : 2424,
    username : "root",
    password : "satul213"
})

var db = server.use('o2')
console.log(db.name)

var sql = "SELECT FROM topic"
db.query(sql).then(function(results){
    console.log(results)
})

var sql = "SELECT FROM topic WHERE @rid=:rid"
db.query(sql,{params:{rid : "#21:0"}}).then(function(results){
    console.log(results)
})

/*
var sql = "INSERT INTO topic (title,description) VALUES (:title,:desc)"
db.query(sql,{params:{title: "Express", desc : "Express is..."}}).then(function(results){
    console.log(results)
})
*/

var sql = "UPDATE topic SET title=:title WHERE @rid=:rid"
db.query(sql,{params:{title : "PRESS", rid:"#23:1"}}).then(function(results){
    console.log(results)
})

var sql = "DELETE FROM topic WHERE @rid=:rid"
db.query(sql,{params:{rid:"#23:1"}}).then(function(results){
    console.log(results)
})

