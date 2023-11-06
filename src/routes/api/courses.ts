import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const allCourses = async (req: Request, res: Response) => {
  try {
    const courses = await prisma.course.findMany();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching courses" });
  }
};

export const getCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await prisma.course.findUnique({
      where: {
        id: Number(id),
      },
      include: {},
    });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: "Error fetching course" });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log(data);
    const course = await prisma.course.create({
      data,
    });
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating course" });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const course = await prisma.course.update({
      where: {
        id: data.id,
      },
      data,
    });
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating course" });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await prisma.course.delete({
      where: {
        id,
      },
    });
    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting course" });
  }
};
