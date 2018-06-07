var express = require("express");
var fs = require("fs");
var app = express();

app.set("view engine", "jade");
app.set("views", "view_prac");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var OrientDB = require("orientjs");
var server = OrientDB({
  host: "localhost",
  port: 2424,
  username: "root",
  password: "satul213"
});
var db = server.use("o2");

///////////////////////
// insert 하기
app.get("/topic/add", (req, res) => {
  var sql = "SELECT FROM topic";
  db.query(sql).then(function(topics) {
    res.render("add", { topics: topics });
  });
});

app.post("/topic/add", (req, res) => {
  var title = req.body.title;
  var des = req.body.des;
  var author = req.body.author;
  var sql =
    "INSERT INTO topic(title,description,author) VALUES(:title,:des,:author)";
  db
    .query(sql, { params: { title: title, des: des, author: author } })
    .then(function(topic) {
      res.redirect("/topic/" + encodeURIComponent(topic[0]["@rid"]));
    });
});
////////////////
// edit 하기

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

app.post("/topic/:id/edit", (req, res) => {
  var title = req.body.title;
  var des = req.body.des;
  var author = req.body.author;
  var id = req.params.id;

  var sql =
    "UPDATE topic SET title=:title, description=:des, author=:author WHERE @rid=:rid";
  db
    .query(sql, { params: { title: title, des: des, author: author, rid: id } })
    .then(function(abc) {
      res.redirect("/topic/" + encodeURIComponent(id));
    });
});

//////////
//삭제하기

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
  var id = req.params.id;

  var sql = "DELETE FROM topic WHERE @rid=:rid";
  db.query(sql, { params: { rid: id } }).then(function(abc) {
    res.redirect("/topic/");
  });
});
/////////////

app.get(["/topic", "/topic/:id"], (req, res) => {
  var sql = "SELECT FROM topic";
  db.query(sql).then(function(topics) {
    //

    var id = req.params.id;
    if (id) {
      var sql = "SELECT FROM topic WHERE @rid=:rid";
      db.query(sql, { params: { rid: id } }).then(function(topic) {
        res.render("view", { topics: topics, topic: topic[0] });
      });
    } else {
      res.render("view", { topics: topics });
    }
  });
});

app.listen(3000, function() {
  console.log("connected!");
});
