var fs = require("fs");
var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var multer = require("multer"); // multer모듈 적용 (for 파일업로드)

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/"); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname); // cb 콜백함수를 통해 전송된 파일 이름 설정
  }
});
var upload = multer({ storage: storage });

app.use(express.static("uploads"));
app.use(cookieParser());
app.use(bodyParser());

app.set("view engine", "jade");
app.set("views", "views");

app.get("/", (req, res) => {
  res.render("file");
});

app.post("/", upload.single("imgFile"), (req, res) => {
  var file22 = req.file.originalname;

  res.send(`hi <img src="/${req.file.originalname}">`);
});



app.listen(3000, function() {
  console.log("aa");
});
