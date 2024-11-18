import { Request, Response } from 'express';
import { studentServices } from './student.service';
const createStudent = async (req: Request, res: Response) => {
  try {
    const studentInfo = req.body.student;
    const result = await studentServices.createStudentIntoDB(studentInfo);
    res.status(200).json({
      success: true,
      message: 'Student is created successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
// get all students controller
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'All students data retrieved successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
// get a student controller
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await studentServices.getSingleStudentFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Retrieved a student data successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
