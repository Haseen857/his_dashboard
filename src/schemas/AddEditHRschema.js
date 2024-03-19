import Joi from "joi-browser";

const AddEditHRschema = {
  sector: Joi.string()
    .allow(null, "")

    .regex(/^\d*[a-zA-Z0-9_ ][a-zA-Z\d\s] [-._!"`'#%&,:;<>=@{}~$()*+/?[]^|]*$/)
    .trim()
    .label("sector")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return {
              message: "Only Alphabets Are Allowed",
            };
          case "any.empty":
            return { message: ` sector is not allowed to be empty` };

          default:
            return {
              message: `Unknown Error`,
            };
        }
      })
    ),

  profileRemove: Joi.string()
    .allow(null, "")

    .regex(/^\d*[a-zA-Z0-9_ ][a-zA-Z\d\s] [-._!"`'#%&,:;<>=@{}~$()*+/?[]^|]*$/)
    .trim()
    .label("profile Remove")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return {
              message: "Only Alphabets Are Allowed",
            };
          case "any.empty":
            return { message: ` profile Remove is not allowed to be empty` };

          default:
            return {
              message: `Unknown Error`,
            };
        }
      })
    ),

  coverRemove: Joi.string()
    .allow(null, "")

    .regex(/^\d*[a-zA-Z0-9_ ][a-zA-Z\d\s] [-._!"`'#%&,:;<>=@{}~$()*+/?[]^|]*$/)
    .trim()
    .label("cover Remove")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return {
              message: "Only Alphabets Are Allowed",
            };
          case "any.empty":
            return { message: ` Cover Remove is not allowed to be empty` };

          default:
            return {
              message: `Unknown Error`,
            };
        }
      })
    ),

  services: Joi.string()
    .allow(null, "")

    .regex(/^\d*[a-zA-Z0-9_ ][a-zA-Z\d\s] [-._!"`'#%&,:;<>=@{}~$()*+/?[]^|]*$/)
    .trim()
    .label("services")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return {
              message: "Only Alphabets Are Allowed",
            };
          case "any.empty":
            return { message: ` services is not allowed to be empty` };

          default:
            return {
              message: `Unknown Error`,
            };
        }
      })
    ),
  companyName: Joi.string()
    .allow(null, "")

    .regex(/^\d*[a-zA-Z0-9_ ][a-zA-Z\d\s] [-._!"`'#%&,:;<>=@{}~$()*+/?[]^|]*$/)
    .trim()
    .label("companyName")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return {
              message: "Only Alphabets Are Allowed",
            };
          case "any.empty":
            return { message: `Company Name is not allowed to be empty` };

          default:
            return {
              message: `Unknown Error`,
            };
        }
      })
    ),
  profile: Joi.object(),
  cover: Joi.object(),
  phoneNo: Joi.string()
    .trim()
    .allow(null, "")
    .min(6)
    .max(17)
    .regex(/^\d*[0-9][0-9\d]*$/)
    .label("phoneNo")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          // case "any.empty":
          //   return {
          //     message: `Phone Number is not allowed to be empty`,
          //   };
          default:
            return {
              message: `Phone Number is not valid`,
            };
        }
      })
    ),
  mobile: Joi.string()
    .regex(/^[0-9]{6,17}$/)
    .trim()
    .min(6)
    .label("Contact")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return {
              message: "Only Numbers Are Allowed between 6 to 17 digits",
            };
          case "any.empty":
            return {
              message: `Mobile Number is not allowed to be empty`,
            };
          default:
            return {
              message: `Mobile Number is not valid`,
            };
        }
      })
    ),
  city: Joi.string()
    .required()
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.empty":
            return {
              message: `City is not allowed to be empty`,
            };
          default:
            return {
              message: `City is not valid`,
            };
        }
      })
    ),

  address: Joi.string()
    .required()
    .min(6)
    .max(150)
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.empty":
            return {
              message: `Address is not allowed to be empty`,
            };
          case "string.min":
            return {
              message: `Address should be greater than 5 characters`,
            };
          case "string.max":
            return {
              message: `Address should be Less than 150 characters`,
            };
        }
      })
    ),

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

export default AddEditHRschema;
