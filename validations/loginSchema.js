const yup = require("yup");
const loginSchema = yup.object({
    password:yup.string().required().min(8).max(12),
});

module.exports = loginSchema;
