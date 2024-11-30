import config from '../../config';
import { TStudent } from '../students/student.interface';
import { StudentModel } from '../students/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createUserToDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || config.default_password;
  userData.id = '203010012';
  userData.role = 'student';

  const newUser = await UserModel.create(userData);

  if (Object.keys(newUser).length !== 0) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }
};

export const userServices = {
  createUserToDB,
};
