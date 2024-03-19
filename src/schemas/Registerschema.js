import Joi from "joi-browser";

const Registerschema = {
  firstName: Joi.string()

    // .allow(null, "")
    .regex(/^\d*[a-zA-Z0-9_ ][a-zA-Z\d\s] [-._!"`'#%&,:;<>=@{}~$()*+/?[]^|]*$/)
    .label("First Name")

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
              message: `First Name is not allowed to be empty`,
            };

          default:
            return {
              message: `Unknown Error`,
            };
        }
      })
    ),
  lastName: Joi.string()
    .allow(null, "")
    // .allow(null, "")

    // .allow("", null)
    .regex(/^\d*[a-zA-Z0-9_ ][a-zA-Z\d\s] [-._!"`'#%&,:;<>=@{}~$()*+/?[]^|]*$/)

    .trim()
    .label("Last Name")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return {
              message:
                "Only Alphabets ,Numbers and Special Symbols Are Allowed",
            };
          // case "any.empty":
          //   return { message: `Last Name is not allowed to be empty` };

          default:
            return {
              message: `Unknown Error`,
            };
        }
      })
    ),

  email: Joi.string()
    .required()
    .email({ minDomainAtoms: 2 })
    .label("Email")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.empty":
            return {
              message: "Email cannot be empty",
            };
          case "string.email":
            return {
              message: "Not correct email format",
            };

          default:
            return {
              message: `Unknown Error`,
            };
        }
      })
    ),

  password: Joi.string()
    .min(8)
    .max(32)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
      "password"
    )
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          // case "any.empty":
          //   return {
          //     message: "Password cannot be empty",
          //   };

          // case "string.regex.name":
          //   return {
          //     message: `Password should be Min. 8 charcter long and includes 1 uppercase letter, 1 special character, 1 digit"`,
          //   };

          default:
            return {
              message: `Password should be Min. 8 charcter long and includes 1 uppercase letter, 1 special character, 1 digit"`,
            };
        }
      })
    ),

  type: Joi.string().required().label("type"),

  confirmPassword: Joi.string()
    .min(8)
    .max(32)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
      "password"
    )
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.empty":
            return {
              message: "Password is not allowed to be empty",
            };

          case "string.min":
            return {
              message: "Password should be Min. 8 charcter long ",
            };

          default:
            return {
              message: `Invalid Password`,
            };
        }
      })
    ),
};

export default Registerschema;
