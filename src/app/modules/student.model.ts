import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TStudentMethods,
  TStudentModel,
  TUserName,
} from './student.interface';
import bcrypt from 'bcrypt';

// userName Schema
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    maxlength: [20, "First name can't be more 20"],
    trim: true,
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
  },
});

// guardian schema
const guardianSchema = new Schema<TGuardian>({
  fathersName: {
    type: String,
    required: true,
    maxlength: [20, "Father's name can't be more 20 characters."],
  },
  fathersOccupation: { type: String, required: true },
  mothersName: { type: String, required: true },
  mothersOccupation: { type: String, required: true },
});
// local guardian schema
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  address: { type: String, required: true },
  contactNo: { type: String, required: true },
});
// student schema
const studentSchema = new Schema<TStudent, TStudentModel, TStudentMethods>(
  {
    id: { type: String, required: true, unique: true },
    name: {
      type: userNameSchema,
      required: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      maxlength: [20, 'Never cross 20 characters.'],
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    dateOfBirth: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: { type: String },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: { type: guardianSchema, required: true },
    localGuardian: { type: localGuardianSchema, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    isActive: {
      type: String,
      enum: { values: ['active', 'blocked'], message: '{VALUE} is not valid!' },
      default: 'active',
    },
    profileImg: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// user mongoose middlewares
studentSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// so that user can't see the password anymore
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// deduct some data before find
studentSchema.pre('find', async function (next) {
  // here this means query data
  this.find({ isDeleted: { $ne: true } }).select('-password');
  next();
});

// deduct deleted data before find one data
studentSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } }).select('-password');
  next();
});

studentSchema.method('isUserExists', async function (id: string) {
  return await StudentModel.findOne({ id: id });
});

// virtual class
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// model
export const StudentModel = model<TStudent, TStudentModel>(
  'Student',
  studentSchema,
);
