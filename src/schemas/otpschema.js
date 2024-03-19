import Joi from "joi-browser";

const otpschema = {
  otp: Joi.string()
    .min(5)
    .max(8)
    .regex(/^\d*[0-9][0-9\d]*$/)
    .label("Otp")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.empty":
            return {
              message: `OTP is not allowed to be empty`,
            };
          default:
            return {
              message: `OTP is not valid`,
            };
        }
      })
    ),
};

export default otpschema;
