var express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mysql = require("mysql");
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
var bkfd2Password = require("pbkdf2-password");
var bodyParser = require("body-parser");

var app = express();
var hasher = bkfd2Password();

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "satul213",
  database: "o2"
});
conn.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "asd!@#!@#ADasdzxcAD",
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "satul213",
      database: "o2"
    })
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/register", (req, res) => {
  var output = `
      <h1>Register</h1>
      <form action="/auth/register" method="post">
          <p>
              <input type="text" name="username" placeholder="username">    
          </p>
          <p>
              <input type="password" name="password" placeholder="password">
          </p>
          <p>
          <input type="text" name="displayName" placeholder="displayName">
          </p>
          <p>
              <input type="submit">
          </p>
      
      </form>
      `;

  res.send(output);
});

app.post("/auth/register", (req, res) => {
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

app.get("/auth/login", (req, res) => {
  var output = `
    <h1>Login</h1>
      <form action="/auth/login" method="post">
          <p>
              <input type="text" name="username" placeholder="username">    
          </p>
          <p>
              <input type="password" name="password" placeholder="password">
          </p>
          <p>
              <input type="submit">
          </p>
      
      </form>
      `;
  res.send(output);
});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  var sql = "select * from users where id=?";
  conn.query(sql, [id], function(err, results) {
    done(null, results[0]);
  });
});

passport.use(
  new LocalStrategy(function(username, password, done) {
    var sql = "select * from users where username=?";
    conn.query(sql, [username], function(err, results) {
      return hasher({ password: password, salt: results[0].salt }, function(
        err,
        pass,
        salt,
        hash
      ) {
        if (hash === results[0].password) {
          done(null, results[0]);
        } else {
          done(null, false);
        }
      });
    });
  })
);

app.post(
  "/auth/login",
  passport.authenticate("local", {
    successRedirect: "/welcome",
    failureRedirect: "/auth/login",
    failureFlash: false
  })
);

app.get("/welcome", (req, res) => {
  if (req.user && req.user.displayName) {
    res.send(`
    <h1>Hello, ${req.user.displayName}</h1>
    <a href="/auth/logout">logout</a>
`);
  } else {
    res.send(`
        <h1>Welcome</h1>
        <ul>
        <li><a href="/auth/login">login</a></li>
        <li><a href="/auth/register">register</a></li>
        </ul>
    `);
  }
});

app.get("/auth/logout", (req, res) => {
  req.logout();
  req.session.save(function() {
    res.redirect("/welcome");
  });
});

app.listen(3000, function() {
  console.log("connected!");
});
