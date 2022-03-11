const { create, getRange } = require("../controllers/posts");

const router = require("express").Router();

router.post("/", create);
router.get("/", getRange);

module.exports = router;
