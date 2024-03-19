import Joi from "joi-browser";

const AddEditProductschema = {
  name: Joi.string()

    // .allow(null, "")
    .regex(/^\d*[a-zA-Z0-9_ ][a-zA-Z\d\s] [-._!"`'#%&,:;<>=@{}~$()*+/?[]^|]*$/)
    .label("Name")

    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return {
              message:
                "Only Alphabets ,Numbers and Special Symbols Are Allowed",
            };
          case "any.empty":
            return {
              message: `Product Name is not allowed to be empty`,
            };

          default:
            return {
              message: `Unknown Error`,
            };
        }
      })
    ),
  details: Joi.string()
    .allow(null, "")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.empty":
            return {
              message: `Details is not allowed to be empty`,
            };
          case "string.min":
            return {
              message: `Details should be greater than 5 characters`,
            };
        }
      })
    ),

  manufacturer: Joi.string()
    .allow(null, "")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.empty":
            return {
              message: `Details is not allowed to be empty`,
            };
          case "string.min":
            return {
              message: `Details should be greater than 5 characters`,
            };
        }
      })
    ),

  speciality: Joi.string().required(),
  brochure: Joi.string().required(),
  certificate: Joi.string().required(),
  country: Joi.string()
    .required()
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.empty":
            return {
              message: `Country is not allowed to be empty`,
            };
          default:
            return {
              message: `country is not valid`,
            };
        }
      })
    ),
};

export default AddEditProductschema;
