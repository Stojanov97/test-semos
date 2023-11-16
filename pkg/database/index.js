const mongoose = require("mongoose");
const { get } = require("../config");
const jwt = require("jsonwebtoken");
const SECRET = get("SECRET");

const username = get("MONGO_USERNAME");
const password = get("MONGO_PASSWORD");
const cluster = get("MONGO_CLUSTER");
const database = get("MONGO_DATABASE");

var token = null;
(() => {
  token = jwt.sign(
    {
      name: "Riste",
      email: "stojanov091@gmail.com",
      id: "randomId12312312",
    },
    SECRET
  );
})();

console.log(token);

const uri = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority`;

(async () => {
  try {
    await mongoose.connect(uri);
    console.log("mongo connected successfully");
  } catch (err) {
    throw new Error(err);
  }
})();
