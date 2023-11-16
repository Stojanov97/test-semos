require("dotenv").config();

let get = (section) => {
  return process.env[section];
};

module.exports = {
  get,
};
