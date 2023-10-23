import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const allStudents = async (req: Request, res: Response) => {
  try {
    const students = await prisma.student.findMany();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Error fetching students" });
  }
};

export const getStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const student = await prisma.student.findUnique({
      where: {
        id: Number(id),
      },
      include: {},
    });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: "Error fetching student" });
  }
};

export const createStudent = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const student = await prisma.student.create({
      data,
    });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: "Error creating student" });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const student = await prisma.student.update({
      where: {
        id: data.id,
      },
      data,
    });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: "Error updating student" });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await prisma.student.delete({
      where: {
        id,
      },
    });
    res.status(200);
  } catch (error) {
    res.status(500).json({ error: "Error deleting student" });
  }
};
