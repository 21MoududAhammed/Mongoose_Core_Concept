import express from 'express';
import { studentControllers } from './student.controller';


const router = express.Router();
// create a student 
router.post('/create-student', studentControllers.createStudent);

// get all students 
router.get('/', studentControllers.getAllStudents );
// get a student 
router.get('/:id', studentControllers.getSingleStudent)

export const studentRoutes = router;
