const { sign } = require("jsonwebtoken");

exports.genTokens = ({ id }) => {
  return {
    accessToken: this.genAccessToken({ id }),
    refreshToken: this.genRefreshToken({ id }),
  };
};
exports.genAccessToken = ({ id }) => {
  return sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2m" });
};

exports.genRefreshToken = ({ id }) => {
  return sign({ id }, process.env.REFRESH_TOKEN_SECRET);
};
