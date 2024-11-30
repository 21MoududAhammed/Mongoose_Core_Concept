/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { studentServices } from './student.service';
// import { studentValidationSchema } from './student.validation';
// import { z } from 'zod';

// Controller to create a new student
// const createStudent = async (req: Request, res: Response): Promise<any> => {
//   try {
//     // Extracting student info from request body
//     const studentInfo = req.body.student;
//     // Validate student data with Zod schema
//     const validatedStudent = studentValidationSchema.parse(studentInfo);

//     // Pass the validated data to service layer
//     const result = await studentServices.createStudentIntoDB(validatedStudent);

//     // Send success response
//     res.status(201).json({
//       success: true,
//       message: 'Student is created successfully!',
//       data: result,
//     });
//   } catch (err: any) {
//     if (err instanceof z.ZodError) {
//       // Handle validation errors
//       return res.status(400).json({
//         success: false,
//         message: 'Validation error occurred.',
//         errors: err.errors.map((error) => error.message), // Return detailed validation errors
//       });
//     }

//     // Handle other errors
//     res.status(500).json({
//       success: false,
//       message: 'Something went wrong while creating the student.',
//       error: err.message,
//     });
//   }
// };

// Controller to retrieve all students
const getAllStudents = async (req: Request, res: Response):Promise<any> => {
  try {
    // Fetch all students from the database
    const result = await studentServices.getAllStudentsFromDB();

    // Send success response
    res.status(200).json({
      success: true,
      message: 'All students data retrieved successfully!',
      data: result,
    });
  } catch (err : any) {
    // Handle errors during data retrieval
    res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching all students.',
      error: err.message,
    });
  }
};

// Controller to retrieve a single student by ID
const getSingleStudent = async (req: Request, res: Response):Promise<any> => {
  try {
    // Extract ID from request parameters
    const id = req.params.id;

    // Fetch the student with the given ID
    const result = await studentServices.getSingleStudentFromDB(id);

    if (!result) {
      // Handle case when the student is not found
      return res.status(404).json({
        success: false,
        message: `Student with ID ${id} not found.`,
      });
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Student data retrieved successfully!',
      data: result,
    });
  } catch (err: any) {
    // Handle errors during data retrieval
    res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching the student.',
      error: err.message,
    });
  }
};

// delete single student from db
const deleteSingleStudent = async (req: Request, res: Response): Promise<any> => {
  const { studentId } = req.params;
  const result = await studentServices.deleteSingleStudentFromDb(studentId);
  res.status(200).json({
    success: true,
    message: 'Deleted a student successfully!',
    data: result,
  });
};

// Export the controllers
export const studentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};
