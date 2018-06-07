var express = require("express");
var session = require("express-session");

var FileStore = require("session-file-store")(session);

var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();

var app = express();

app.use(
  session({
    secret: "ilovesukyung", //이 부분은 우리가 만든 에플리케이션이 세션 id를 사용자의 웹브라우저에 심을 때, 암호화 해주는 코드(랜덤한 값, 쿠키세팅과 같은)
    resave: false,
    saveUninitialized: true, // 나머지는 그냥 false, true 해주면 됨
    store: new FileStore()
  })
);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var users = [
  {
    username: "a",
    password:
      "rWV47MgukPnCIcwMjNXOEsYf8b+6JLiGdDOcX5vcUrEhs5KIAOX5la+y43xtOoXYzxOxulTLIh26SAwEb7q1u7Q6hP1Iboj7fkWhSQPQFBriYYXYuJ3Cthw/g63rxRVKbTvkMHjGOqiu3v6lMKn1UO3Q2lKYVUlGx0J3AfPUyMo=", // 111
    salt:
      "rHql9p+ctzKMc1URXZr/3iWtgRWiv6nEYoPOeP/2XBscjmEFPqhRPRSeNPSkDAEe8UF+fdQwyywYmUlNKmLm9Q==",
    displayName: "Yangha"
  }
];

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

    users.push(user);
    

    req.session.displayName = req.body.displayName;
    console.log(users)
    req.session.save(function() {
      res.redirect("/welcome");
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

app.post("/auth/login", (req, res) => {
  var uname = req.body.username;
  var pwd = req.body.password;

  for (var i = 0; i < users.length; i++) {
    
    var user = users[i];
    
    if (uname === user.username) {
       return hasher({ password: pwd, salt: user.salt }, function(
        err,
        pass,
        salt,
        hash
      ) {
        if (hash === user.password) {
          req.session.displayName = user.displayName;
          req.session.save(function() {
             return res.redirect("/welcome");
          })
        } else {
          res.send("Who are you nigga? <a href='/auth/login'>login</a>");
        }
      });
    }
     
  }
  res.send("Who are you niggaaaaaaaaaa? <a href='/auth/login'>login</a>");
});

app.get("/welcome", (req, res) => {
  if (req.session.displayName) {
    res.send(`
            <h1>Hello, ${req.session.displayName}</h1>
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
  delete req.session.displayName;
  req.session.save(function() {
    res.redirect("/welcome");
  });
});






app.listen(3000, function() {
  console.log("Connected 3000 port!");
});
