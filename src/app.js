const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
  const morgan = require("morgan");
  app.use(morgan("dev"));
}
//middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));
// routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));

app.listen(port, () => {
  console.log("aplicacion ejecutandose en el puerto: ", port);
});
