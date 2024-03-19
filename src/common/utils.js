import Joi from "joi-browser";

export const validate = (data, schema) => {
  const options = { abortEarly: false };
  const { error } = Joi.validate(data, schema, options);
  if (!error) return null;

  const errors = {};
  for (let item of error.details) errors[item.path[0]] = item.message;
  return errors;
};

export const validateProperty = ({ name, value }, schemas) => {
  const obj = { [name]: value };
  const schema = { [name]: schemas[name] };
  const { error } = Joi.validate(obj, schema);
  return error ? error.details[0].message : null;
};
