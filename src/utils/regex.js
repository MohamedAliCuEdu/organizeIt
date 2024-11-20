const REGEX = {
  USERNAME: /^[a-zA-Z][a-zA-Z0-9_]{4,19}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,30}$/,
  NAME: /^[a-zA-Z-' ]{3,49}$/,
  EDUCATION: /^[A-Za-z0-9\s'"\-.,()&]{10,70}$/,
  BIRTH_DATE: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
  TAG: /^[a-zA-Z0-9_-]{1,20}$/,
};

export default REGEX;
