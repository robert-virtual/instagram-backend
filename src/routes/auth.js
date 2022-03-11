const { upload } = require("../config/multer");
const { register, login, refresh } = require("../controllers/auth");

const router = require("express").Router();

router.post("/register", upload.array("profile"), register);
router.post("/login", login);
router.post("/refresh", refresh);

module.exports = router;
