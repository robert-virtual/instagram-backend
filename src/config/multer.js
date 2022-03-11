const multer = require("multer");
const { v4: uuid } = require("uuid");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads");
  },
  filename(req, file, cb) {
    cb(null, `${uuid()}.${file.originalname.split(".")[1]}`);
  },
});

exports.upload = multer({ storage });
