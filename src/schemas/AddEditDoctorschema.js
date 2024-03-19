import Joi from "joi-browser";

const AddEditDoctorschema = {
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
  position: Joi.string().required(),
  speciality: Joi.string().required(),
  experience: Joi.string().required(),
  email: Joi.string()
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
  profile: Joi.object(),
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
  state: Joi.string()
    .required()
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.empty":
            return {
              message: `State is not allowed to be empty`,
            };
          default:
            return {
              message: `State is not valid`,
            };
        }
      })
    ),
  degree: Joi.string()
    .required()
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.empty":
            return {
              message: `Degree is not allowed to be empty`,
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

  about: Joi.string()
    .allow(null, "")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.empty":
            return {
              message: `About is not allowed to be empty`,
            };
          case "string.min":
            return {
              message: `About should be greater than 5 characters`,
            };
        }
      })
    ),
  // country: Joi.string()
  //   .required()
  //   .regex(/^[A-Za-z ]+$/)
  //   .error((errors) =>
  //     errors.map((error) => {
  //       switch (error.type) {
  //         case "any.empty":
  //           return {
  //             message: `Country is not allowed to be empty`,
  //           };
  //         case "any.required":
  //           return {
  //             message: `Country is a required field`,
  //           };
  //       }
  //     })
  //   ),
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
  // status: Joi.string()
  //   .required()
  //   .error((errors) =>
  //     errors.map((error) => {
  //       switch (error.type) {
  //         case "any.empty":
  //           return {
  //             message: `Status is not allowed to be empty`,
  //           };
  //       }
  //     })
  //   ),
};

export default AddEditDoctorschema;
