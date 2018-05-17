var express = require("express");
var app = express();
var fs = require("fs");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.locals.pretty = true;
app.set("view engine", "jade");
app.set("views", "./views_file");

app.get("/topic/new", (req, res) => {
  fs.readdir("data", function(err, files) {
    if (err) {
      console.log(err);
      res.status(500).send("internal Server Error");
    } else {
      res.render("new", { topics: files });
    }
  });
});

app.post("/topic", (req, res) => {
  var title = req.body.title;
  var des = req.body.des;

  fs.writeFile(`data/${title}`, des, function(err) {
    if (err) {
      console.log("interner Server Error!");
      res.status(500).send("internal Server Error");
    }
    res.redirect("/topic/" + title);
  });
});

app.get(["/topic", "/topic/:id"], (req, res) => {
  fs.readdir("data", function(err, files) {
    if (err) {
      console.log(err);
      res.status(500).send("internal Server Error");
    }

    var id = req.params.id; // id 값을 가져오는 건데 있다면 ture 없다면 null(false)가 저장됨
    //id값이 있다면
    if (id) {
      fs.readFile("./data/" + id, "utf8", function(err, data) {
        if (err) {
          console.log("interner Server Error!");
          res.status(500).send("internal Server Error");
        }

        res.render("view", { title: id, topics: files, des: data });
      });
    } else {
      // files안에는 data디렉토리 안에있는 파일 이름들의 Array가 들어있어
      res.render("view", {
        topics: files,
        title: "Welcome",
        des: "Hellow JavaScript for Server"
      }); // 이러면 view.jade에서 files라는 Array를 topics라는 이름으로 사용할 수 있음
    }
  });
});

app.listen(3000, function() {
  console.log("Connected, 3000 port!");
});
