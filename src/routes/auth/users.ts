import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { compare, encrypt } from "../../lib/bcrypt";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  const { email, password, type } = req.body;
  const filter = {
    where: {
      email,
    },
  };
  try {
    const data =
      type === "student"
        ? await prisma.student.findUnique(filter)
        : await prisma.teacher.findUnique(filter);
    if (!data) throw new Error("User not found");
    if (!(await compare(password, data.password)))
      throw new Error("Invalid password");
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error logging in" });
  }
};

export const register = async (req: Request, res: Response) => {
  const { data, type } = req.body;
  try {
    data.password = await encrypt(data.password);
    const user =
      type === "student"
        ? await prisma.student.create({ data })
        : await prisma.teacher.create({ data });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error registering user" });
  }
};
