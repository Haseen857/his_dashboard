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
