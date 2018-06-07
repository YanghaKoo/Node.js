var express = require("express");
var app = express();

app.set("view engine", "jade");
app.set("views", "view_prac");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var mysql = require("mysql");
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "satul213",
  database: "o2"
});
conn.connect();

app.get("/topic/:id/edit", (req, res) => {
  conn.query("SELECT * FROM topic", (err, topics) => {
    if (err) {
      console.log("err");
      res.status(500).send("Internal Server Error2");
    }

    var sql = "SELECT * FROM topic WHERE id=?";

    var id = req.params.id;
    conn.query(sql, [id], function(err, rows, fields) {
      if (err) {
        console.log("err");
        res.status(500).send("Internal Server Error3");
      }

      res.render("edit", { topics, topic: rows[0] });
    });
  });
});

app.post("/topic/:id/edit", (req, res) => {
  var title = req.body.title;
  var des = req.body.des;
  var author = req.body.author;
  var id = req.params.id;

  var sql = "UPDATE topic SET title=?, description=?, author=? WHERE id=?";
  conn.query(sql, [title, des, author, id], function(err, results) {
    res.redirect("/topic/" + id);
  });
});

app.get("/topic/:id/delete", (req, res) => {
  conn.query("SELECT * FROM topic", (err, topics) => {
    if (err) {
      console.log("err");
      res.status(500).send("Internal Server Error2");
    }

    var sql = "SELECT * FROM topic WHERE id=?";

    var id = req.params.id;
    conn.query(sql, [id], function(err, rows, fields) {
      if (err) {
        console.log("err");
        res.status(500).send("Internal Server Error3");
      }

      res.render("delete", { topics, topic: rows[0] });
    });
  });
});

app.post("/topic/:id/delete", (req, res) => {
  var id = req.params.id;

  var sql = "DELETE FROM topic WHERE id=?";
  conn.query(sql, [id], function(err, results) {
    res.redirect("/topic/");
  });
});

app.get("/topic/add", (req, res) => {
  conn.query("SELECT * FROM topic", (err, topics) => {
    if (err) {
      console.log("err");
      res.status(500).send("Internal Server Error");
    }
    res.render("add", { topics });
  });
});

app.post("/topic/add", (req, res) => {
  var title = req.body.title;
  var des = req.body.des;
  var author = req.body.author;
  var sql = "INSERT INTO topic(title, description, author) VALUES(?,?,?)";
  conn.query(sql, [title, des, author], (err, results) => {
    if (err) {
      console.log("err");
      res.status(500).send("Internal Server Error");
    }
    res.redirect("/topic/" + results.insertId);
  });
});

app.get(["/topic", "/topic/:id"], (req, res) => {
  var sql = "SELECT * From topic";
  conn.query(sql, function(err, topics, fileds) {
    if (err) {
      console.log("err");
      res.status(500).send("Internal Server Error");
    }
    var id = req.params.id;
    if (id) {
      var sql = "SELECT * FROM topic WHERE id=?";
      conn.query(sql, [id], function(err, results, fields) {
        if (err) {
          console.log("err");
          res.status(500).send("Internal Server Error");
        }
        res.render("view", { topics, topic: results[0] });
      });
    } else {
      res.render("view", { topics });
    }
  });
});

app.listen(3000, function() {
  console.log("Qweqweqweqweqweqweqeqweqwe");
});
