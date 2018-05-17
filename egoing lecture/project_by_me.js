var express = require("express");
var app = express();

app.set("view engine", "jade");
app.set("views", "views");

//포스트 방식이므로 바디파서 해주기
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));


va
var list = `<li><a href="/?id=0">Express</a></li>
<li><a href="/?id=1">Javascript</a></li>
<li><a href="?id=2">Nodejs</a></li>
`;

app.get("/", (req, res) => {
  //list += `<li><a href="#">${req.body.title}</a></li>`;

  var title = ""; // 클릭한 것 이름
  var des = ""; // 클릭한 것 설명

  var output = `<h1>Server Side JavaScript</h1>
${list}
${title} <br>
${des}
<a href="/edit">new</a>
`;

  res.send(output);
});

app.post("/", (req, res) => {
  list += `<li><a href="#">${req.body.title}</a></li>`;

  var title = "";
  var des = "";

  var output = `<h1>Server Side JavaScript</h1>
    ${list}
    ${title} <br>
    ${des}
    <a href="/edit">new</a>
    `;

  res.send(output);
});

app.get("/edit", (req, res) => {
  res.render("edit");
});

app.listen(3000, function() {
  console.log("port 3000 connected!");
});
