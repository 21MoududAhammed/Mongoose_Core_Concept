import {
  Student,
  LocalGuardian,
  UserName,
  Guardian,
} from './student.interface';
import { Schema, model } from 'mongoose';
// userName Schema
const userNameSchema = new Schema<UserName>({
  firstName: { type: String },
  middleName: { type: String },
  lastName: { type: String },
});

// guardian schema
const guardianSchema = new Schema<Guardian>({
  fathersName: { type: String },
  fathersOccupation: { type: String },
  mothersName: { type: String },
  mothersOccupation: { type: String },
});
// local guardian schema
const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String },
  occupation: { type: String },
  address: { type: String },
  contactNo: { type: String },
});
// student schema
const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameSchema,
  gender: ['male', 'female'],
  dateOfBirth: { type: String },
  email: { type: String },
  contactNo: { type: String },
  emergencyContactNo: { type: String },
  presentAddress: { type: String },
  permanentAddress: { type: String },
  guardian: guardianSchema,
  LocalGuardian: localGuardianSchema,
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  profileImg: ['isActive', 'blocked'],
});

// model 
export const StudentModel = model<Student>('Student', studentSchema);
