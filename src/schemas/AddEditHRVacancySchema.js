import Joi from "joi-browser";

const AddEditHRVacancySchema = {
  post: Joi.string()
    .required()
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return {
              message: "Only Alphabets Are Allowed",
            };
          case "any.empty":
            return {
              message: `Post is not allowed to be empty`,
            };

          default:
            return {
              message: `Unknown Error`,
            };
        }
      })
    ),
  employmentType: Joi.string()
    .required()
    .label("Employment Type")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return {
              message: "Only Alphabets Are Allowed",
            };
          case "any.empty":
            return { message: `Employment Type is not allowed to be empty` };

          default:
            return {
              message: `Unknown Error`,
            };
        }
      })
    ),

  headquarter: Joi.string()
    .allow(null, "")

    .regex(/^\d*[a-zA-Z0-9_ ][a-zA-Z\d\s] [-._!"`'#%&,:;<>=@{}~$()*+/?[]^|]*$/)
    .trim()
    .label("Headquater")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return {
              message: "Only Alphabets Are Allowed",
            };
          case "any.empty":
            return { message: `Headquater is not allowed to be empty` };

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

  education: Joi.string()
    .required()
    .label("Education")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return {
              message: "Only Alphabets Are Allowed",
            };
          case "any.empty":
            return { message: `Education is not allowed to be empty` };

          default:
            return {
              message: `Unknown Error`,
            };
        }
      })
    ),

  skills: Joi.string()
    .allow(null, "")

    .regex(/^\d*[a-zA-Z0-9_ ][a-zA-Z\d\s] [-._!"`'#%&,:;<>=@{}~$()*+/?[]^|]*$/)
    .trim()
    .label("Skills")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return {
              message: "Only Alphabets Are Allowed",
            };
          case "any.empty":
            return { message: `Skills is not allowed to be empty` };

          default:
            return {
              message: `Unknown Error`,
            };
        }
      })
    ),

  experience: Joi.string()
    .allow(null, "")

    .regex(/^\d*[a-zA-Z0-9_ ][a-zA-Z\d\s] [-._!"`'#%&,:;<>=@{}~$()*+/?[]^|]*$/)
    .trim()
    .label("Experience")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return {
              message: "Only Alphabets Are Allowed",
            };
          case "any.empty":
            return { message: `Experience is not allowed to be empty` };

          default:
            return {
              message: `Unknown Error`,
            };
        }
      })
    ),

  // phoneNo: Joi.string()
  //   .regex(/^[0-9]{6,17}$/)
  //   .trim()
  //   .min(6)
  //   .label("Phone No")
  //   .error((errors) =>
  //     errors.map((error) => {
  //       switch (error.type) {
  //         case "string.regex.base":
  //           return {
  //             message: "Only Numbers Are Allowed between 6 to 17 digits",
  //           };
  //         case "any.empty":
  //           return {
  //             message: `Phone Number is not allowed to be empty`,
  //           };
  //         default:
  //           return {
  //             message: `Phone Number is not valid`,
  //           };
  //       }
  //     })
  //   ),

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

  gender: Joi.string()
    .allow(null, "")

    .regex(/^\d*[a-zA-Z0-9_ ][a-zA-Z\d\s] [-._!"`'#%&,:;<>=@{}~$()*+/?[]^|]*$/)
    .trim()
    .label("Gender")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return {
              message: "Only Alphabets Are Allowed",
            };
          case "any.empty":
            return { message: `Gender is not allowed to be empty` };

          default:
            return {
              message: `Unknown Error`,
            };
        }
      })
    ),

  minAge: Joi.string()
    .regex(/^[0-9]{1,3}$/)
    .trim()
    .min(1)
    .label("MinAge")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return {
              message: "Maximum 3 digits allowed.",
            };
          case "any.empty":
            return {
              message: `MinAge is not allowed to be empty`,
            };
          default:
            return {
              message: `MinAge is not valid`,
            };
        }
      })
    ),
  maxAge: Joi.string()
    .regex(/^[0-9]{1,3}$/)
    .trim()
    .min(1)
    .label("MaxAge")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return {
              message: "Maximum 3 digits allowed.",
            };
          case "any.empty":
            return {
              message: `MaxAge is not allowed to be empty`,
            };
          default:
            return {
              message: `MaxAge is not valid`,
            };
        }
      })
    ),

  nationality: Joi.string()
    .required()
    .trim()
    .label("nationality")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return {
              message: "Only Alphabets Are Allowed",
            };
          case "any.empty":
            return { message: `Nationality is not allowed to be empty` };

          default:
            return {
              message: `Unknown Error`,
            };
        }
      })
    ),

  jobDescription: Joi.string()
    .allow(null, "")

    .regex(/^\d*[a-zA-Z0-9_ ][a-zA-Z\d\s] [-._!"`'#%&,:;<>=@{}~$()*+/?[]^|]*$/)
    .trim()
    .label("jobDescription")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return {
              message: "Only Alphabets Are Allowed",
            };
          case "any.empty":
            return { message: `Job Description is not allowed to be empty` };

          default:
            return {
              message: `Unknown Error`,
            };
        }
      })
    ),
  start: Joi.string()
    .regex(/^[0-9]{3,7}$/)
    .trim()
    .min(1)
    .label("start")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return {
              message: "Minimum 3 and Maximum 7 digits allowed.",
            };
          case "any.empty":
            return {
              message: `Min Salary is not allowed to be empty`,
            };
          default:
            return {
              message: `Min Salary is not valid`,
            };
        }
      })
    ),
  end: Joi.string()
    .regex(/^[0-9]{3,7}$/)
    .trim()
    .min(1)
    .label("end")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return {
              message: "Minimum 3 and Maximum 7 digits allowed.",
            };
          case "any.empty":
            return {
              message: `Max Salary is not allowed to be empty`,
            };
          default:
            return {
              message: `Max Salary is not valid`,
            };
        }
      })
    ),
  currency: Joi.string()
    .trim()
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.empty":
            return {
              message: `currency cant be empty`,
            };
          default:
            return {
              message: `not valid`,
            };
        }
      })
    ),
  // phoneNo: Joi.string()
  //   .trim()
  //   .allow(null, "")
  //   .min(6)
  //   .max(17)
  //   .regex(/^\d*[0-9][0-9\d]*$/)
  //   .label("phoneNo")
  //   .error((errors) =>
  //     errors.map((error) => {
  //       switch (error.type) {
  //         // case "any.empty":
  //         //   return {
  //         //     message: `Phone Number is not allowed to be empty`,
  //         //   };
  //         default:
  //           return {
  //             message: `Phone Number is not valid`,
  //           };
  //       }
  //     })
  //   ),
  // mobile: Joi.string()
  //   .regex(/^[0-9]{6,17}$/)
  //   .trim()
  //   .min(6)
  //   .label("Contact")
  //   .error((errors) =>
  //     errors.map((error) => {
  //       switch (error.type) {
  //         case "string.regex.base":
  //           return {
  //             message: "Only Numbers Are Allowed between 6 to 17 digits",
  //           };
  //         case "any.empty":
  //           return {
  //             message: `Mobile Number is not allowed to be empty`,
  //           };
  //         default:
  //           return {
  //             message: `Mobile Number is not valid`,
  //           };
  //       }
  //     })
  //   ),
  // city: Joi.string()
  //   .required()
  //   .error((errors) =>
  //     errors.map((error) => {
  //       switch (error.type) {
  //         case "any.empty":
  //           return {
  //             message: `City is not allowed to be empty`,
  //           };
  //         default:
  //           return {
  //             message: `City is not valid`,
  //           };
  //       }
  //     })
  //   ),
  // state: Joi.string()
  //   .required()
  //   .error((errors) =>
  //     errors.map((error) => {
  //       switch (error.type) {
  //         case "any.empty":
  //           return {
  //             message: `State is not allowed to be empty`,
  //           };
  //         default:
  //           return {
  //             message: `State is not valid`,
  //           };
  //       }
  //     })
  //   ),
  // degree: Joi.string()
  //   .required()
  //   .error((errors) =>
  //     errors.map((error) => {
  //       switch (error.type) {
  //         case "any.empty":
  //           return {
  //             message: `Degree is not allowed to be empty`,
  //           };
  //       }
  //     })
  //   ),
  // address: Joi.string()
  //   .required()
  //   .min(6)
  //   .max(150)
  //   .error((errors) =>
  //     errors.map((error) => {
  //       switch (error.type) {
  //         case "any.empty":
  //           return {
  //             message: `Address is not allowed to be empty`,
  //           };
  //         case "string.min":
  //           return {
  //             message: `Address should be greater than 5 characters`,
  //           };
  //         case "string.max":
  //           return {
  //             message: `Address should be Less than 150 characters`,
  //           };
  //       }
  //     })
  //   ),

  // about: Joi.string()
  //   .allow(null, "")
  //   .error((errors) =>
  //     errors.map((error) => {
  //       switch (error.type) {
  //         case "any.empty":
  //           return {
  //             message: `About is not allowed to be empty`,
  //           };
  //         case "string.min":
  //           return {
  //             message: `About should be greater than 5 characters`,
  //           };
  //       }
  //     })
  //   ),
  // // country: Joi.string()
  // //   .required()
  // //   .regex(/^[A-Za-z ]+$/)
  // //   .error((errors) =>
  // //     errors.map((error) => {
  // //       switch (error.type) {
  // //         case "any.empty":
  // //           return {
  // //             message: `Country is not allowed to be empty`,
  // //           };
  // //         case "any.required":
  // //           return {
  // //             message: `Country is a required field`,
  // //           };
  // //       }
  // //     })
  // //   ),
  // country: Joi.string()
  //   .required()
  //   .error((errors) =>
  //     errors.map((error) => {
  //       switch (error.type) {
  //         case "any.empty":
  //           return {
  //             message: `Country is not allowed to be empty`,
  //           };
  //         default:
  //           return {
  //             message: `country is not valid`,
  //           };
  //       }
  //     })
  //   ),
  // // status: Joi.string()
  // //   .required()
  // //   .error((errors) =>
  // //     errors.map((error) => {
  // //       switch (error.type) {
  // //         case "any.empty":
  // //           return {
  // //             message: `Status is not allowed to be empty`,
  // //           };
  // //       }
  // //     })
  // //   ),
};

export default AddEditHRVacancySchema;
