import Joi from "joi-browser";

const Forgotschema = {
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
};

export default Forgotschema;
