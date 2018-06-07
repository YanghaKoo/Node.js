module.exports = function(app) {
  var route = require("express").Router();
  var conn = require("../../config/mysql/db")();
  var bodyParser = require("body-parser");
  app.use(bodyParser.urlencoded({ extended: false }));

  route.get("/add", (req, res) => {
    var sql = "SELECT * FROM topic";
    conn.query(sql, function(err, topics, fields) {
      if (err) {
        console.log("err");
      }
      res.render("./topic/add", { topics: topics, user : req.user });
    });
  });

  route.post("/add", (req, res) => {
    var title = req.body.title;
    var des = req.body.des;
    var author = req.body.author;

    var sql = "INSERT INTO topic (title, description, author) VALUES(?,?,?)";
    var params = [title, des, author];

    conn.query(sql, params, function(err, rows, fields) {
      if (err) {
        console.log(err);
      }
      if (rows.insertId) {
        res.redirect("/topic/" + rows.insertId);
      }
    });
  });

  route.get("/:id/edit", (req, res) => {
    var sql = "SELECT * FROM topic";
    conn.query(sql, function(err, topics, fields) {
      var id = req.params.id;
      var sql = "SELECT * FROM topic WHERE id=?";
      var params = [id];
      conn.query(sql, params, function(err, rows, fields) {
        if (err) console.log(err);
        res.render("./topic/edit", { topics, topic: rows[0] , user : req.user});
      });
    });
  });

  route.post("/:id/edit", (req, res) => {
    var title = req.body.title;
    var des = req.body.des;
    var author = req.body.author;
    var id = req.params.id;

    var sql = "UPDATE topic SET title=?, description=?, author=? WHERE id=?";
    var params = [title, des, author, id];

    conn.query(sql, params, function(err, rows, fields) {
      if (err) {
        console.log(err);
      }

      if (rows.affectedRows) {
        res.redirect("/topic/" + id);
      }
    });
  });

  route.get("/:id/delete", (req, res) => {
    var sql = "SELECT id,title FROM topic";
    conn.query(sql, function(err, topics, fields) {
      var id = req.params.id;
      var sql = "SELECT * FROM topic WHERE id=?";
      var params = [id];
      conn.query(sql, params, function(err, rows, fields) {
        if (err) console.log(err);
        if (rows.length === 0) {
          res.send("no record");
        }
        res.render("./topic/delete", { topics, topic: rows[0], user : req.user  });
      });
    });
  });

  route.post("/:id/delete", (req, res) => {
    var id = req.params.id;

    var sql = "DELETE FROM topic WHERE id=?";
    var params = [id];

    conn.query(sql, params, function(err, rows, fields) {
      if (err) {
        console.log(err);
      }

      if (rows.affectedRows) {
        res.redirect("/topic/");
      }
    });
  });

  route.get(["/", "/:id"], (req, res) => {
    var sql = "SELECT * FROM topic";

    conn.query(sql, function(err, topics, fields) {
      var id = req.params.id;
      if (id) {
        var sql = "SELECT * FROM topic WHERE id=?";
        var params = [id];
        conn.query(sql, params, function(err, rows, fields) {
          res.render("./topic/view", { topics: topics, topic: rows[0], user : req.user });
        });
      } else {
        res.render("./topic/view", { topics: topics, user : req.user });
      }
    });
  });

  return route;
};
