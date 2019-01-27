const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePicInput(data) {
  let errors = {};

  data.image = !isEmpty(data.image) ? data.image : "";

  if (Validator.isEmpty(data.image)) {
    errors.image = "You must select an image";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
