var mysql = require("mysql");
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "satul213",
  database: "o2"        // 애초에 어떠한 데이터베이스 들어갈지 명시해줌
});
conn.connect();
// 앞에 말했듯이 비밀번호를 소스코드에 쓰는건 바람직하지 못한 방법
/*
var sql = "SELECT * FROM topic";
conn.query(sql, function(err, rows, fields) {
  if (err) {
    console.log(err);
  } else {
    for(var i =0; i<rows.length; i++){
        console.log(rows)
    }
  }
});

*/

var sql = "INSERT INTO topic (title, description, author) VALUES(?,?,?)"
var params = ['NPM2','NPM is good', 'Yangaha'];

conn.query(sql,params,function(err,rows,fields){
    if(err) console.log(err)
    else {
        console.log(rows)
    }
})


//쓰기중에서 추가, 수정, 삭제

/*
var sql = "UPDATE topic SET title=?, author=? WHERE id=?"
var params = ["ScriptJava", "Sukyung", 1]
conn.query(sql,params,function(err,rows,fields){
  if(err){
    console.log("err")
  }else{
    console.log(rows)
  }
})
*/
//삭제
/*
var sql = "DELETE FROM topic WHERE id=?"
var params = [1]
conn.query(sql,params,function(err,rows,fields){
  if(err){
    console.log("err")
  }else{
    console.log(rows)
  }
})

*/


















conn.end();