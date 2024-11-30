import express from 'express';
import { studentControllers } from './student.controller';

const router = express.Router();
// create a student
// router.post('/create-student', studentControllers.createStudent);

// get all students
router.get('/', studentControllers.getAllStudents);
// get a student
router.get('/:id', studentControllers.getSingleStudent);

// delete single student
router.delete('/:studentId', studentControllers.deleteSingleStudent);

export const studentRoutes = router;
