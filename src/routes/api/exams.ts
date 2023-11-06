import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const allExams = async (req: Request, res: Response) => {
  try {
    const exams = await prisma.exam.findMany({
      include: {
        course: true,
        teacher: true,
      },
    });
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ error: "Error fetching exams" });
  }
};

export const getExam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const exam = await prisma.exam.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        course: true,
        teacher: true,
      },
    });
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ error: "Error fetching exam" });
  }
};

export const createExam = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const course = parseInt(data.courseId);
    const teacher = parseInt(data.teacherId);
    delete data.courseId;
    delete data.teacherId;
    const exam = await prisma.exam.create({
      data: {
        ...data,
        course: {
          connect: {
            id: course,
          },
        },
        teacher: {
          connect: {
            id: teacher,
          },
        },
      },
    });
    res.status(200).json(exam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating exam" });
  }
};

export const updateExam = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const exam = await prisma.exam.update({
      where: {
        id: data.id,
      },
      data,
    });
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ error: "Error updating exam" });
  }
};

export const deleteExam = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await prisma.exam.delete({
      where: {
        id,
      },
    });
    res.status(200);
  } catch (error) {
    res.status(500).json({ error: "Error deleting exam" });
  }
};
