import jwt from "jsonwebtoken"
//var jwt = require("jsonwebtoken");

let secret = 'ajkdjaffasddfj';
let obj = {user: "ali"};

let token = jwt.sign(obj, secret);

console.log("token", token);

let plain =jwt.verify(token, secret);

console.log("plain", plain);