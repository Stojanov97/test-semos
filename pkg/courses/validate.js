const { Validator } = require("node-input-validator");

const coursePost = {
  name: "required|string",
  classesNo: "required|string",
  teacher: "required|string",
  book: "required|string",
};

const coursePatch = {
  name: "string",
  classesNo: "string",
  teacher: "string",
  book: "string",
};

const validate = async (data, schema) => {
  let validator = new Validator(data, schema);
  let validated = validator.check();
  if (!validated) {
    throw {
      code: 400,
      error: validator.errors,
    };
  }
};

module.exports = {
  coursePost,
  coursePatch,
  validate,
};
