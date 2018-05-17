var express = require("express");
var app = express();
var fs = require("fs");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.locals.pretty = true;
app.set("view engine", "jade");
app.set("views", "./views_file");

app.get("/topic/new", (req, res) => {
  res.render("new");
});





app.post("/topic", (req, res) => {
  var title = req.body.title;
  var des = req.body.des;

  fs.writeFile(`data/${title}`, des, function(err) {
    if (err) {
      console.log("interner Server Error!");
      res.status(500).send("internal Server Error");
    }
    res.send(req.body.title);
  });
});



app.get("/topic", (req, res) => {
    fs.readdir("data", function(err, files) {
      if (err) {
        console.log(err);
        res.status(500).send("internal Server Error");
      }
      // files안에는 data디렉토리 안에있는 파일 이름들의 Array가 들어있어
      res.render("view", { topics: files }); // 이러면 view.jade에서 files라는 Array를 topics라는 이름으로 사용할 수 있음
    });
  });



app.get("/topic/:id", (req, res) => {
  var id = req.params.id;
  fs.readdir("data", function(err, files) {
    if (err) {
      console.log(err);
      res.status(500).send("internal Server Error");
    }

    fs.readFile("./data/" + id, "utf8", function(err, data) {
      if (err) {
        console.log("interner Server Error!");
        res.status(500).send("internal Server Error");
      }

      res.render("view", { title: id, topics: files, des:data });
    });
  });
});










app.listen(3000, function() {
  console.log("Connected, 3000 port!");
});

