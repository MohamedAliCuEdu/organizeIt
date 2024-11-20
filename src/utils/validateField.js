import REGEX from "./regex";

const validateField = (name, value, formData) => {
  let error = "";
  switch (name) {
    case "username":
      error = REGEX.USERNAME.test(value) ? "" : "invalid username|";
      break;
    case "password":
      error = REGEX.PASSWORD.test(value) ? "" : "invalid password!";
      break;
    case "fname":
      error = REGEX.NAME.test(value) ? "" : "invalid name!";
      break;
    case "lname":
      error = REGEX.NAME.test(value) ? "" : "invalid name!";
      break;
    case "birthDate":
      error = REGEX.BIRTH_DATE.test(value) ? "" : "birth date is required!";
      break;
    case "gender":
      error = value ? "" : "gender is required!";
      break;
    case "country":
      error = value ? "" : "country is required!";
      break;
    default:
      break;
  }
  return error;
};

export default validateField;
