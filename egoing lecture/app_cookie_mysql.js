var express = require("express");
var app = express();

var cookieParser = require("cookie-parser");
app.use(cookieParser("123"));

var mysql = require("mysql");
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "satul213",
  database: "bs"
});
conn.connect();

app.get("/products", (req, res) => {
  var output = "";
  var sql = "SELECT * FROM book";
  conn.query(sql, function(err, rows, fileds) {
    for (var id in rows) {
      console.log(rows[id].title);
      output += `<a href="/cart/${rows[id].id}"><li>${rows[id].title}</li></a>`;
    }

    res.send(`<h1>Product List</h1><ul>${output}</ul><a href="/cart">cart</a>`);
  });
});

app.get("/cart/:id", (req, res) => {
  var id = req.params.id;
  if (req.signedCookies.cart) {
    var cart = req.signedCookies.cart;
  } else {
    var cart = {};
  }

  if (!cart[id]) {
    cart[id] = 0;
  }
  cart[id] = Number(cart[id]) + 1;

  res.cookie("cart", cart, { signed: true });
  res.redirect("/cart");
});

app.get("/cart", (req, res) => {
  var sql = "SELECT * FROM book";
  var cart = req.signedCookies.cart;
  var output = ``;
  console.log(cart);

  conn.query(sql, function(err, rows, fields) {
    for (var id in rows) {
      var id2 = Number(id)+1
      console.log(id2);
      output += `<li>${rows[id].title} ${cart[Number(id)+1]}</li>`;
    }

    res.send(`<h1>Cart</h1><ul>${output}</ul>`);
  });
});


app.get("/counter", (req, res) => {
  if (req.signedCookies.count) {
    var count = Number(req.signedCookies.count);
  } else {
    var count = 0;
  }

  res.cookie("count", count + 1, { signed: true });
  res.send("Counter : " + req.signedCookies.count);
});

app.listen(3000, function() {
  console.log("Connected! 3000 port!");
});
