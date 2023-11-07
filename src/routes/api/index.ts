import { Router } from "express";
import {
  allStudents,
  createStudent,
  deleteStudent,
  getStudent,
  updateStudent,
} from "./students";
import {
  allTeachers,
  createTeacher,
  deleteTeacher,
  getTeacher,
  updateTeacher,
} from "./teachers";
import {
  allCourses,
  createCourse,
  deleteCourse,
  getCourse,
  updateCourse,
} from "./courses";
import {
  addGrade,
  allExams,
  createExam,
  deleteExam,
  getExam,
  getGrade,
  updateExam,
} from "./exams";

const router = Router();

// Students
router.get("/student", allStudents);
router.get("/student/:id", getStudent);
router.post("/student", createStudent);
router.put("/student", updateStudent);
router.delete("/student", deleteStudent);

// Teachers
router.get("/teacher", allTeachers);
router.get("/teacher/:id", getTeacher);
router.post("/teacher", createTeacher);
router.put("/teacher", updateTeacher);
router.delete("/teacher", deleteTeacher);

// Courses
router.get("/course", allCourses);
router.get("/course/:id", getCourse);
router.post("/course", createCourse);
router.put("/course", updateCourse);
router.delete("/course", deleteCourse);

// Exams
router.get("/exam", allExams);
router.get("/exam/:id", getExam);
router.post("/exam", createExam);
router.put("/exam", updateExam);
router.delete("/exam", deleteExam);
router.post("/exam/grade/", addGrade);
router.get("/exam/grade/:id", getGrade);

export default router;
