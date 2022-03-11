const { hash, verify } = require("argon2");
const { verify: verifyJWT } = require("jsonwebtoken");

const { genTokens, genAccessToken } = require("../config/tokens");
const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const prisma = new PrismaClient();

exports.register = async (req = request, res = response) => {
  let { password } = req.body;
  try {
    password = await hash(password);
    const user = await prisma.user.create({
      data: {
        ...req.body,
        password,
        imageUrl: req.files[0].filename,
      },
    });
    let tokens = genTokens(user);
    await prisma.user.update({
      data: {
        refreshToken: tokens.refreshToken,
      },
      where: {
        id: user.id,
      },
    });

    res.json({ user, ...tokens });
  } catch (error) {
    console.log(req.body);
    console.log(req.body.password);
    res.status(500).json({ msg: error.message });
  }
};

exports.login = async (req = request, res = response) => {
  const { password, email } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.json({ msg: "Bad Credentials" });
  }

  const valid = await verify(user.password, password);
  if (!valid) {
    return res.json({ msg: "Bad Credentials" });
  }

  const tokens = genTokens();
  await prisma.user.update({
    data: {
      refreshToken: tokens.refreshToken,
    },
    where: {
      id: user.id,
    },
  });

  user.password = undefined;
  res.json({ user, ...tokens });
};

exports.refresh = async (req = request, res = response) => {
  const { refreshToken } = req.body;
  try {
    const { id } = verifyJWT(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      return res.json({ msg: "Token invalido" });
    }
    if (user.refreshToken != refreshToken) {
      return res.json({ msg: "Token expiro" });
    }

    const accessToken = genAccessToken(user);
    res.json({ accessToken });
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};
