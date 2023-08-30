const router = require("express").Router()
const {register, login, logout} = require("../controllers/auth")

// validation middleware
const validation = require("../middlewares/validationMiddleware");

// validation schema
const registerSchema = require("../validations/registerSchema")
const loginSchema = require("../validations/loginSchema")

router.route("/register").post(validation(registerSchema),register);
router.route("/login").post(validation(loginSchema),login);
router.route("/logout").get(logout);

module.exports = router
