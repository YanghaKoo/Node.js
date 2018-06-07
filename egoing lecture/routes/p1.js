module.exports = function(app) {
  //여기서 app을 써서 무슨 처리를 하던지 하고
  var express = require("express");
  var route = express.Router();

  route.get("/r1", (req, res) => {
    res.send("Hello /p1r1");
  });

  route.get("/r2", (req, res) => {
    res.send("Hello /p1r2");
  });

  return route;
};

//결국 route만 리턴해주면 되니까!!!
// app을 매개변수로 주입할 수 있는 테크닉이지 이게!!! 오 존나기발함
// p1으로만 받을수 있는
// 결국 route만 리턴해주면 되니까!!!!!!!!!
