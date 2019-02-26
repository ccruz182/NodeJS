const {SHA256} = require("crypto-js");

const message = "I am a user number 3";
const hash = SHA256(message).toString();

console.log("M", message);
console.log("H", hash);

// JWT
const jwt = require("jsonwebtoken");

const data = {
  id: 10
};

const token = jwt.sign(data, "123abc");
const decoded = jwt.verify(token, "123abc");

console.log("JWT", token);
console.log("Decoded", decoded);
