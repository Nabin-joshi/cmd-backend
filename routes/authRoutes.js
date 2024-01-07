const router = require("express").Router();
const authController = require("../controller/authController");
const auth = require("../middlewares/auth");

// login
router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/logout", auth, authController.logout);

router.get("/refresh", authController.refresh);

module.exports = router;
