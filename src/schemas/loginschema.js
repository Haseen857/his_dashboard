import Joi from "joi-browser";

const loginschema = {
  email: Joi.string()
    .required()
    .email({ minDomainAtoms: 2 })
    .label("Email")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.empty":
            return {
              message: "Email is not allowed to be empty",
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
          case "any.empty":
            return {
              message: "Password is not allowed to be empty",
            };

          // case "string.regex.name":
          //   return {
          //     message: `Password should contain 1 uppercase letter, 1 special character,  min. 1 digit"`,
          //   };

          case "string.min":
            return {
              message: "Password should be Min. 8 charcter long ",
            };

          // case "string.max":
          //   return {
          //     message: "Password cannot be more than 32 character ",
          //   };

          default:
            return {
              message: `Unknown Error`,
            };
        }
      })
    ),
};

export default loginschema;
