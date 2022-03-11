const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const prisma = new PrismaClient();

exports.me = async (req = request, res = response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.userId,
    },
    select: {
      id: true,
      imageUrl: true,
      name: true,
      email: true,
      created_at: true,
    },
  });
  user.imageUrl = process.env.APP_URL + user.imageUrl;
  res.json({ user });
};
exports.following = async (req = request, res = response) => {
  const users = await prisma.user.findUnique({
    where: {
      id: req.userId,
    },
    select: {
      following: {
        select: {
          imageUrl: true,
          name: true,
        },
      },
    },
  });

  res.json({ users });
};

exports.followers = async (req = request, res = response) => {
  const users = await prisma.user.findUnique({
    where: {
      id: req.userId,
    },
    select: {
      followers: {
        select: {
          imageUrl: true,
          name: true,
        },
      },
    },
  });

  res.json({ users });
};
