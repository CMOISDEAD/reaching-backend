import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const allTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = await prisma.teacher.findMany();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching teacher" });
  }
};

export const getTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const teacher = await prisma.teacher.findUnique({
      where: {
        id: Number(id),
      },
      include: {},
    });
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ error: "Error fetching teacher" });
  }
};

export const createTeacher = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const teacher = await prisma.teacher.create({
      data,
    });
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ error: "Error creating teacher" });
  }
};

export const updateTeacher = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const teacher = await prisma.teacher.update({
      where: {
        id: data.id,
      },
      data,
    });
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ error: "Error updating teacher" });
  }
};

export const deleteTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await prisma.teacher.delete({
      where: {
        id,
      },
    });
    res.status(200);
  } catch (error) {
    res.status(500).json({ error: "Error deleting teacher" });
  }
};
