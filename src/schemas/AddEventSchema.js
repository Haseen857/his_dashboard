import Joi from "joi-browser";

const AddEventschema = {
  topic: Joi.string()
    // .allow(null, "")
    // .regex(/^\d*[a-zA-Z][a-zA-Z\d\s] [-._!"`'#%&,:;<>=@{}~$()*+/?[]^|]*$/)
    .regex(/^\d*[a-zA-Z 0-9-($&+,:;=?@#|'<>._^*()%!)]*$/)
    // .label("Hospital Name")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return {
              message: "only Words , Numbers and Special Symbols Are Allowed",
            };
          case "any.empty":
            return {
              message: `Topic is not allowed to be empty`,
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

  spokesPerson: Joi.string()
    // .allow(null, "")
    // .regex(/^\d*[a-zA-Z][a-zA-Z\d]*$/)
    .regex(/^\d*^[a-zA-Z ($&+,:;=?@#|'<>._^*()%!)\s]*$/)
    .label("Name")

    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return {
              message: "Special characters is not allowed",
            };
          case "any.empty":
            return {
              message: `Name is not allowed to be empty`,
            };

          default:
            return {
              message: `Unknown Error`,
            };
        }
      })
    ),

  mode: Joi.string()
    .required()
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.empty":
            return {
              message: `Mode is not allowed to be empty`,
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

  reach: Joi.string()
    .required()
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.empty":
            return {
              message: `Reach is not allowed to be empty`,
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

  currency: Joi.string()
    .required()
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.empty":
            return {
              message: `Currency is not allowed to be empty`,
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

  typed: Joi.string()
    .required()
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.empty":
            return {
              message: `type is not allowed to be empty`,
            };

          default:
            return {
              message: `Unknown Error`,
            };
        }
      })
    ),
  departmentId: Joi.string()
    .required()
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.empty":
            return {
              message: `DepartmentId is not allowed to be empty`,
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

  // eventFee: Joi.string()
  //   .regex(/^[0-9]{1,20}$/)
  //   .required()
  //   .min(1)
  //   .error((errors) =>
  //     errors.map((error) => {
  //       switch (error.type) {
  //         case "string.regex.base":
  //           return {
  //             message: "Only Numbers Are Allowed between 0 to 20",
  //           };
  //         case "any.empty":
  //           return {
  //             message: `Fees is not allowed to be empty`,
  //           };
  //         default:
  //           return {
  //             message: `Unkdown Error`,
  //           };
  //       }
  //     })
  //   ),
  eventFee: Joi.string()
    .required()
    .regex(/^\d*\.?\d+[0-9]{0,5}$/)
    .label("eventFee")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return { message: "Please enter valid fee" };
          case "any.empty":
            return { message: `Please enter fee for event` };
          default:
            return {
              message: `Unknown Error`,
            };
        }
      })
    ),

  description: Joi.string()
    .required()
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

  endTime: Joi.string()
    .required()
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return {
              message: "invalid time",
            };
          case "any.empty":
            return {
              message: `End Time is not allowed to be empty`,
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
  startTime: Joi.string()
    .required()
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return {
              message: "invalid time",
            };
          case "any.empty":
            return {
              message: `Start Time is not allowed to be empty`,
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
  startDate: Joi.string()
    .required()
    .error((errors) =>
      errors.map((error) => {
        // debugger;
        switch (error.type) {
          case "any.empty":
            return {
              message: `Date is not allowed to be empty`,
            };
          default:
            return {
              message: `Date is not valid`,
            };
        }
      })
    ),
  endDate: Joi.string()
    .required()
    .error((errors) =>
      errors.map((error) => {
        // debugger;
        switch (error.type) {
          case "any.empty":
            return {
              message: `Date is not allowed to be empty`,
            };
          default:
            return {
              message: `Date is not valid`,
            };
        }
      })
    ),
  discountPercent: Joi.number()
    .less(100)
    .precision(2)
    .label("discountPercent")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "string.regex.base":
            return { message: "Enter valid discount" };
          default:
            return {
              message: `Unknown Error`,
            };
        }
      })
    ),

  // discountPercent: Joi.string()
  //   .allow(null, "")
  //   .regex(/^0*([0-9]|[1-8][0-9]|9[0-9]|100)$/)
  //   .error((errors) =>
  //     errors.map((error) => {
  //       switch (error.type) {
  //         case "string.regex.base":
  //           return {
  //             message: "maximum 100",
  //           };
  //         default:
  //           return {
  //             message: `Unkdown Error`,
  //           };
  //       }
  //     })
  //   ),
  coupon: Joi.string().allow(null, ""),
  cover: Joi.object(),
  eventLink: Joi.string()
    // .regex(
    //   /^((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/
    // )
    .uri()
    .required()
    .error((errors) =>
      errors.map((error) => {
        // debugger;
        switch (error.type) {
          case "any.empty":
            return {
              message: `Link  is not allowed to be empty`,
            };
          default:
            return {
              message: `EventLink is not valid`,
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

export default AddEventschema;
