import { TStudent } from './student.interface';
import { StudentModel } from './student.model';
// insert a student to db
const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student); // here create is a built in static method
  const student = new StudentModel(studentData);
  if (await student.isUserExists(studentData.id)) {
    throw new Error('This user already exists.');
  }
  const result = await student.save(); // here save is a built in instance method
  return result;
};
// get all students from db
const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

// get a student from db
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.find({ id });
  return result;
};

// delete a student
const deleteSingleStudentFromDb = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDb,
};
