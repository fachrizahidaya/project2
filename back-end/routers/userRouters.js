const router = require("express").Router();
const { user } = require("../controllers");

router.post("/register", user.register);
router.post("/login", user.login);
router.get("/keepLogin", user.keepLogin);
router.get("/verification", user.verification);

module.exports = router;
