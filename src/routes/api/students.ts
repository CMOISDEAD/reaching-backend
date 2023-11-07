import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { encrypt } from "../../lib/bcrypt";

const prisma = new PrismaClient();

export const allStudents = async (req: Request, res: Response) => {
  try {
    const students = await prisma.student.findMany({
      include: {
        course: true,
        StudentGrade: true,
      },
    });
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
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
      include: {
        course: {
          include: {
            exams: true,
          },
        },
        StudentGrade: true,
      },
    });
    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching student" });
  }
};

export const createStudent = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = data.courseId;
    delete data.courseId;
    data.password = await encrypt(data.password);
    const student = await prisma.student.create({
      data: {
        ...data,
        course: {
          connect: {
            id: Number(id),
          },
        },
      },
    });
    res.status(200).json(student);
  } catch (error) {
    console.error(error);
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
    console.error(error);
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
    console.error(error);
    res.status(500).json({ error: "Error deleting student" });
  }
};
