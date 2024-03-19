import Joi from "joi-browser";

const AddScheduleSchema = {
  consultationCharges: Joi.string()
    .trim()
    .min(1)
    .max(10)
    .label("ConsultationCharge")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.string":
            return {
              message: `charges should be a Number`,
            };
          case "any.empty":
            return {
              message: `Charges cant be empty`,
            };
          default:
            return {
              message: `not valid`,
            };
        }
      })
    ),
  videoFirstVisit: Joi.number()
    .less(100000)
    .precision(2)
    // .regex(/^\d*[0-9]*$/)
    // .trim()
    // .min(1)
    // .max(10)
    .label("videoFirstVisit")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.string":
            return {
              message: `charges should be a Number`,
            };
          case "any.empty":
            return {
              message: `Charges cant be empty`,
            };
          default:
            return {
              message: `not valid`,
            };
        }
      })
    ),
  videoFollowUp: Joi.number()
    .less(100000)
    .precision(2)
    .label("videoFollowUp")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.string":
            return {
              message: `charges should be a Number`,
            };
          case "any.empty":
            return {
              message: `Charges cant be empty`,
            };
          default:
            return {
              message: `not valid`,
            };
        }
      })
    ),
  audioFirstVisit: Joi.number()
    .less(100000)
    .precision(2)
    .label("audioFirstVisit")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.string":
            return {
              message: `charges should be a Number`,
            };
          case "any.empty":
            return {
              message: `Charges cant be empty`,
            };
          default:
            return {
              message: `not valid`,
            };
        }
      })
    ),
  audioFollowUp: Joi.number()
    .less(100000)
    .precision(2)
    .label("audioFollowUp")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.string":
            return {
              message: `charges should be a Number`,
            };
          case "any.empty":
            return {
              message: `Charges cant be empty`,
            };
          default:
            return {
              message: `not valid`,
            };
        }
      })
    ),
  homeFirstVisit: Joi.number()
    .less(100000)
    .precision(2)
    .label("homeFirstVisit")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.string":
            return {
              message: `charges should be a Number`,
            };
          case "any.empty":
            return {
              message: `Charges cant be empty`,
            };
          default:
            return {
              message: `not valid`,
            };
        }
      })
    ),
  homeFollowUp: Joi.number()
    .less(100000)
    .precision(2)
    .label("homeFollowUp")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.string":
            return {
              message: `charges should be a Number`,
            };
          case "any.empty":
            return {
              message: `Charges cant be empty`,
            };
          default:
            return {
              message: `not valid`,
            };
        }
      })
    ),
  messageFirstVisit: Joi.number()
    .less(100000)
    .precision(2)
    .label("messageFirstVisit")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.string":
            return {
              message: `charges should be a Number`,
            };
          case "any.empty":
            return {
              message: `Charges cant be empty`,
            };
          default:
            return {
              message: `not valid`,
            };
        }
      })
    ),
  messageFollowUp: Joi.number()
    .less(100000)
    .precision(2)
    .label("messageFollowUp")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.string":
            return {
              message: `charges should be a Number`,
            };
          case "any.empty":
            return {
              message: `Charges cant be empty`,
            };
          default:
            return {
              message: `not valid`,
            };
        }
      })
    ),
  physicalFirstVisit: Joi.number()
    .less(100000)
    .precision(2)
    .label("physicalFirstVisit")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.string":
            return {
              message: `charges should be a Number`,
            };
          case "any.empty":
            return {
              message: `Charges cant be empty`,
            };
          default:
            return {
              message: `not valid`,
            };
        }
      })
    ),
  physicalFollowUp: Joi.number()
    .less(100000)
    .precision(2)
    .label("physicalFollowUp")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.string":
            return {
              message: `charges should be a Number`,
            };
          case "any.empty":
            return {
              message: `Charges cant be empty`,
            };
          default:
            return {
              message: `not valid`,
            };
        }
      })
    ),
  discount: Joi.string()
    .regex(/^\d*[0-9]*$/)
    .trim()
    .min(1)
    .max(10)
    .label("discount")
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.string":
            return {
              message: `discount should be a Number`,
            };
          case "any.empty":
            return {
              message: `discount cant be empty`,
            };
          default:
            return {
              message: `not valid`,
            };
        }
      })
    ),
  doctorId: Joi.string()
    .trim()
    .min(1)
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.empty":
            return {
              message: `doctor ID cant be empty`,
            };
          default:
            return {
              message: `not valid`,
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
  duration: Joi.number()

    .greater(4)
    .less(31)
    .error((errors) =>
      errors.map((error) => {
        switch (error.type) {
          case "any.empty":
            return {
              message: `Duration cant be empty`,
            };
          // case "any.greater":
          //   return {
          //     message: `Duration should be greater than 5 min`,
          //   };
          // case "any.less":
          //   return {
          //     message: `Duration should be less than 5 min`,
          //   };
          default:
            return {
              message: `Duration should be between 5 to 30 minutes`,
            };
        }
      })
    ),
};

export default AddScheduleSchema;
