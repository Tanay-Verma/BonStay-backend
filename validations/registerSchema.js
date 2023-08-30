const yup = require("yup");

const registerSchema = yup.object({
  name: yup.string().required().min(3),
  address: yup.string().required(),
  phoneNo: yup
    .string()
    .required()
    .matches(/^[1-9]{1}[0-9]{9}$/, "Please provide a valid mobile number"),
  emailId: yup.string().email().required(),
  password: yup.string().required().min(8).max(12),
});

module.exports = registerSchema;
