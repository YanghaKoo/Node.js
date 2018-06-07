module.exports = function(app) {
  var conn = require("./db")();
  var passport = require("passport");
  var LocalStrategy = require("passport-local").Strategy;
  var bkfd2Password = require("pbkdf2-password");
  var hasher = bkfd2Password();

  app.use(passport.initialize());
  app.use(passport.session());

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

  return passport;
};
