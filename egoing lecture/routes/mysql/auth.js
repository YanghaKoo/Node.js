// // /auth로 시작하는 접근들을 처리하는ㄹ ㅏ우트들으 들어갈거임
// var express = require("express")
// var route = express.Router();
module.exports = function(passport) {
  
  var bkfd2Password = require("pbkdf2-password");
  var hasher = bkfd2Password();
  var conn = require("../../config/mysql/db")();
  var route = require("express").Router(); // 객체 리턴시킴

  route.get("/register", (req, res) => {
    var sql = "SELECT * FROM topic";
    conn.query(sql, function(err, topics, fields) {
      res.render("./auth/register", { topics: topics });
    });
  });

  route.post("/register", (req, res) => {
    hasher({ password: req.body.password }, function(err, pass, salt, hash) {
      var user = {
        username: req.body.username,
        password: hash,
        salt: salt,
        displayName: req.body.displayName
      };

      var sql = "insert into users set ?";
      conn.query(sql, user, function(err, results) {
        if (err) {
          console.log(err);
          res.status(500).send("Error!");
        } else {
          req.login(user, function(err) {
            req.session.save(function() {
              res.redirect("/welcome");
            });
          });
        }
      });
    });
  });

  route.get("/login", (req, res) => {
    var sql = "SELECT * FROM topic";
    conn.query(sql, function(err, topics, fields) {
      res.render("./auth/login", { topics: topics });
    });
  });

  route.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/topic",
      failureRedirect: "/auth/login",
      failureFlash: false
    })
  );

  route.get("/logout", (req, res) => {
    req.logout();
    req.session.save(function() {
      res.redirect("/topic");
    });
  });

  return route;
};
