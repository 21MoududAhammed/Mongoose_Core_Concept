import { Student } from "./student.interface";
import { StudentModel } from "./student.model";
// insert a student to db 
const createStudentIntoDB=async(student: Student)=>{
    const result = await StudentModel.create(student);
    return result;
}
// get all students from db 
const getAllStudentsFromDB= async()=>{
    const result  = await StudentModel.find();
    return result;
}

// get a student from db 
const getSingleStudentFromDB=async(id: string)=>{
    const result = await StudentModel.find({id});
    return result;
}

export const studentServices ={
    createStudentIntoDB,
    getAllStudentsFromDB,
    getSingleStudentFromDB,
}