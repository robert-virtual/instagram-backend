const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const prisma = new PrismaClient();

exports.create = async (req = request, res = response) => {
  const post = await prisma.post.create({
    data: { userId: req.userId, ...req.body },
  });
  res.json({ post });
};

exports.getRange = async (req = request, res = response) => {
  const { userId, inicio, cantidad } = req.query;

  const posts = await prisma.post.findMany({
    where: {
      userId,
    },
    skip: inicio,
    take: cantidad,
  });
  res.json({ posts });
};
