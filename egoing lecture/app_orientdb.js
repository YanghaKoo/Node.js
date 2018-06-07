var express = require("express");
var app = express();

var OrientDB = require("orientjs");
var server = OrientDB({
  host: "localhost",
  port: 2424,
  username: "root",
  password: "satul213"
});
var db = server.use("o2");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.locals.pretty = true;
app.set("view engine", "jade");
app.set("views", "./views_orientdb");
// 여기까지 기본 setting

//////////////
//삽입 시작
app.get("/topic/add", (req, res) => {
  var sql = " SELECT FROM topic";
  db.query(sql).then(function(topics) {
    res.render("add", { topics: topics });
  });
});


app.post("/topic/add", (req, res) => {
  var title = req.body.title;
  var des = req.body.des;
  var author = req.body.author;

  var sql =
    "INSERT INTO topic (title,description,author) VALUES (:title,:desc,:author)";
  db
    .query(sql, { params: { title: title, desc: des, author: author } })
    .then(function(results) {
      var rid = encodeURIComponent(results[0]["@rid"]);
      res.redirect("/topic/" + rid);
    });
});
///////////////////////////////////////
// 수정 시작

app.get("/topic/:id/edit", (req, res) => {
  var sql = "SELECT FROM topic";
  var id = req.params.id;

  db.query(sql).then(function(topics) {
    
    var sql = "SELECT FROM topic WHERE @rid=:rid";
    db.query(sql, { params: { rid: id } }).then(function(topic) {
      res.render("edit", { topics: topics, topic: topic[0] });
    });
  });
});

// 얘는 위에 애를 받는거징
app.post("/topic/:id/edit", (req, res) => {
  var sql =
    "UPDATE topic SET title=:t, description=:d, author=:a WHERE @rid=:rid";
  var id = req.params.id;
  var title = req.body.title;
  var des = req.body.des;
  var author = req.body.author;

  db.query(sql, { params: { t: title, d: des, a: author, rid: id } }).then(function(topics) {
      res.redirect('/topic/'+encodeURIComponent(id))
    });
});


/////////////////////////
//삭제 시작
app.get("/topic/:id/delete", (req, res) => {
  var sql = "SELECT FROM topic";
  var id = req.params.id;

  db.query(sql).then(function(topics) {
    
    var sql = "SELECT FROM topic WHERE @rid=:rid";
    db.query(sql, { params: { rid: id } }).then(function(topic) {
      res.render("delete", { topics: topics, topic: topic[0] });
    });
  });
});

app.post("/topic/:id/delete", (req, res) => {
  var sql =
    "DELETE FROM topic WHERE @rid=:rid";
  var id = req.params.id;

  db.query(sql, { params: { rid: id } }).then(function(topics) {
      res.redirect('/topic/')
    });
});

/////////////////////

app.get(["/topic", "/topic/:id"], (req, res) => {
  var sql = "SELECT FROM topic";
  db.query(sql).then(function(topics) {
    //이거 자체가 topics를 넘겨주기 위함이네

    var id = req.params.id;
    if (id) {
      var sql = "SELECT FROM topic WHERE @rid=:rid"; // 그 후 id가 있다면 그 id에 맞는걸 db에서 가져오고 하는거고
      db.query(sql, { params: { rid: id } }).then(function(topic) {
        res.render("view", { topics: topics, topic: topic[0] });
      });
    } else {
      res.render("view", { topics: topics }); // id가 없다면 topics만 그대로 넘겨서 목록만 출력하게 하는거고
    }
  });
});










app.listen(3000, function() {
  console.log("Connected, 3000 port!");
});
