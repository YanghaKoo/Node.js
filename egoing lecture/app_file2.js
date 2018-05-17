var express = require("express");
var app = express();
var fs = require("fs");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.locals.pretty = true;
app.set("view engine", "jade");
app.set("views", "view_prac");

//입력하고
app.get("/topic/new", (req, res) => {
  fs.readdir("data", (err, files) => {
    if (err) {
      console.log("Error!");
      res.status(500).send("Error!");
    }

    res.render("new", { topics: files });
  });
});

//파일추가하기
app.post("/topic", (req, res) => {
  var title = req.body.title;
  var des = req.body.des;

  fs.writeFile(`./data/${title}`, des, err => {
    if (err) {
      console.log("internal error occured!");
      res.status(500).send("Internal Error!");
    }
    res.redirect("/topic/" + title);
  });
});

app.get(["/topic", "/topic/:id"], (req, res) => {
  fs.readdir("data", (err, files) => {
    if (err) {
      console.log("Error occuered in loading files");
      res.status(500).send("Internal Error!");
    }
    var id = req.params.id;
    if (id) {
      fs.readFile("./data/" + id, (err, data) => {
        if (err) {
          console.log("error!");
          res.status(500).send("Error");
        } else {
          res.render("view", { topics: files, title: id, des: data });
        }
      });
    } else {
      res.render("view", { topics: files });
    }
  });
});


app.listen(3000, function() {
  console.log("port 3000, connection complete!");
});
