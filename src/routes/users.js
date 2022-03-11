const { me, followers, following } = require("../controllers/user");
const { auth } = require("../middlewares/auth");

const router = require("express").Router();

router.get("/me", auth, me);
router.get("/following", auth, following);
router.get("/followers", auth, followers);

module.exports = router;
