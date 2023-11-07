import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const allExams = async (req: Request, res: Response) => {
  try {
    const exams = await prisma.exam.findMany({
      include: {
        course: true,
        teacher: true,
        studentsGrades: {
          include: {
            student: true,
          },
        },
      },
    });
    res.status(200).json(exams);
  } catch (error) {
    console.log(error);
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
        studentsGrades: {
          include: {
            student: true,
          },
        },
        course: true,
        teacher: true,
      },
    });
    res.status(200).json(exam);
  } catch (error) {
    console.log(error);
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

export const addGrade = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log(data);
    const { examId, userId } = data;
    delete data.examId;
    delete data.userId;
    const exam = await prisma.studentGrade.create({
      data: {
        ...data,
        exam: {
          connect: {
            id: Number(examId),
          },
        },
        student: {
          connect: {
            id: Number(userId),
          },
        },
      },
    });
    res.status(200).json(exam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding grade" });
  }
};

export const getGrade = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const grade = await prisma.studentGrade.findMany({
      where: {
        studentId: Number(id),
      },
      include: {
        student: true,
      },
    });
    res.status(200).json(grade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching grade" });
  }
};
