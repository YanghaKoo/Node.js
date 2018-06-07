var express = require("express");
var app = express();

// 이걸로 쿠키관련 작업 가능
var cookieParser = require("cookie-parser");
app.use(cookieParser("123"));

//데이터베이스 대용 객체
var products = {
  1: { title: "The history of Web" },
  2: { title: "The next web" }
};

app.get("/products", (req, res) => {
  var output = "";

  for (var name in products) {
    output += `<a href="/cart/${name}"><li>${products[name].title}</li></a>`;
  }

  res.send(`<h1>Products</h1><ul>${output}</ul><a href="/cart">Cart</a>`);
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
  // 쿠키를 받아옴
  var cart = req.signedCookies.cart;

  if (!cart) {
    res.send("Empty");
  } else {
    var output = "";
    for (var id in cart) {
      output += `<li>${products[id].title} (${cart[id]}) </li>`;
    }

    res.send(
      `<h1>Cart</h1><ul>${output}</ul><a href="/products">Products List</a>`
    );
  }
});

app.get("/count", (req, res) => {
  //초기화
  if (req.signedCookies.count) {
    var count = Number(req.signedCookies.count);
  } else {
    var count = 0;
  }
  count = count + 1;
  res.cookie("count", count, { signed: true });
  res.send("Count : " + count);
});

app.listen(3000, function() {
  console.log("3000 port connected!");
});
