const { request, response } = require("express");
const { verify } = require("jsonwebtoken");

exports.auth = (req = request, res = response, next) => {
  let token = req.header("Authorization");
  if (!token) {
    return res.json({ msg: "necesita un token para acceder a esta ruta" });
  }
  try {
    const { id } = verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = id;
    next();
  } catch (error) {
    res.json({ msg: error.message });
  }
};
