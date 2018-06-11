var fs = require("fs");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser());

var DummyDB = (function() {
  var DummyDB = {};
  var storage = [{id:1,name:"구양하",region:"서울"},{id:2,name: "안수경",region:"죽전"}];
  var count = 3;

  DummyDB.get = function(id) {
    if (id) {
      id = typeof id == "string" ? Number(id) : id;

      for (var i in storage)
        if (storage[i].id == id) {
          return storage[i];
        }
    } else return storage;
  };

  DummyDB.insert = function(data) {
    data.id = count++;
    storage.push(data);
    return data;
  };
  DummyDB.remove = function(id) {
    id = typeof id == "strinf" ? Number(id) : id;

    for (var i in storage)
      if (storage[i].id == id) {
        storage.splice(i, 1);
        return true;
      }
    return false;
  };

  return DummyDB;
})();

app.get("/user", (req, res) => {
    res.send(DummyDB.get())
});

app.get("/user/:id", (req, res) => {
    res.send(DummyDB.get(req.params.id))
});

app.post("/user", (req, res) => {
    
    var name = req.body.name
    console.log(name + "@@@@@@@@@@@@@@@")
    var region = req.body.region
    if(name && region){
        res.send(DummyDB.insert({
            name : name, region : region
        }))
    }else{
        throw new Error('error')
    }

});

app.put("/user/:id", (req, res) => {});

app.del("/user/:id", (req, res) => {});

app.listen(3000, function() {
  console.log("A");
});
