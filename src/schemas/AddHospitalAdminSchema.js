import Joi from "joi-browser";

const AddHospitalschema = {
  hospitalName: Joi.string()
    // .allow(null, "")
    // .regex(/^\d*[a-zA-Z][a-zA-Z\d\s] [-._!"`'#%&,:;<>=@{}~$()*+/?[]^|]*$/)
    .regex(/^\d*[a-zA-Z 0-9-($&+,:;=?@#|'<>._^*()%!)]*$/)
    .label("Hospital Name")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return {
              message: "only Words , Numbers and Special Symbols Are Allowed",
            };
          case "any.empty":
            return {
              message: `Hospital Name is not allowed to be empty`,
            };
          // case "string.max":
          //   return {
          //     message: `Hospital Name must be less than 30 characters long`,
          //   };
          default:
            return {
              message: `Unknown Error`,
            };
        }
      })
    ),

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
    // .allow(null, "")

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
          case "any.empty":
            return { message: `Last Name is not allowed to be empty` };

          default:
            return {
              message: `Unknown Error`,
            };
        }
      })
    ),

  phoneNo: Joi.string()
    .regex(/^[0-9]{6,17}$/)
    .allow(null, "")
    .trim()
    .min(6)
    .max(17)
    .label("phoneNo")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return {
              message: "Only Numbers Are Allowed",
            };

          default:
            return {
              message: `Phone Number is not valid`,
            };
        }
      })
    ),

  mobileNo: Joi.string()
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
    .max(150)
    .error((errors) =>
      errors.map((error) => {
        // debugger;
        switch (error.type) {
          case "string.max":
            return {
              message: `Address is not allowed to be more than 150 characters long`,
            };
          case "any.empty":
            return {
              message: `Address is not allowed to be empty`,
            };
          default:
            return {
              message: `address is not valid`,
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

export default AddHospitalschema;
