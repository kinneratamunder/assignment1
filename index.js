const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

function TotalPrice(newItemPrice, cartTotal) {
  let sum = newItemPrice + cartTotal;

  return sum;
}

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(TotalPrice(newItemPrice, cartTotal).toString());
});

function totalCartValue(cartTotal, isMember) {
  let discountPercentage = 0.1;

  if (isMember === 'true') {
    return cartTotal - cartTotal * discountPercentage;
  } else return cartTotal;
}

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;

  res.send(totalCartValue(cartTotal, isMember).toString());
});

function finalPrice(cartTotal) {
  let tax = 0.05;

  return (result = cartTotal * tax);
}

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);

  res.send(finalPrice(cartTotal).toString());
});

function deliveryMethod(shippingMethod, distance) {
  let result;

  if (shippingMethod === "express") {
    result = distance / 100;
  } else if (shippingMethod === "standard") {
    result = distance / 50;
  } else {
    result = "Invalid shipping method";
  }
  return result;
}

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);

  res.send(deliveryMethod(shippingMethod, distance).toString());
});

function totalCost(weight, distance) {
  let result = weight * distance * 0.1;
  return result;
}

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  res.send(totalCost(weight, distance).toString());
});

function totalAmount(purchaseAmount) {
  let loyaltyRate = 2;
  return result = purchaseAmount * loyaltyRate;
}

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(totalAmount(purchaseAmount).toString());
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});