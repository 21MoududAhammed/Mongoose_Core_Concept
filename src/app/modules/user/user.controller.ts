import { NextFunction, Request, Response } from 'express';
import { userServices } from './user.service';
const createUserStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, student: studentData } = req.body;
    const result = await userServices.createUserToDB(password, studentData);
    res.status(200).json({
      success: true,
      message: 'Created a student successfully',
      data: result,
    });
  } catch (err) {
    next(err)
  }
};

export const userControllers = {
  createUserStudent,
};
