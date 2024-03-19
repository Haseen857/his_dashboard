import Joi from "joi-browser";

const Resetschema = {
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
  oldpassword: Joi.string()
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
  newpassword: Joi.string()
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

export default Resetschema;
