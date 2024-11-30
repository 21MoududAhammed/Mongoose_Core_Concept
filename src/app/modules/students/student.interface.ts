
import { Model , Types} from 'mongoose';

// interface of guardian
export type TGuardian = {
  fathersName: string;
  fathersOccupation: string;
  mothersName: string;
  mothersOccupation: string;
};
// interface for user name
export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
// interface for localGuardian
export type TLocalGuardian = {
  name: string;
  occupation: string;
  address: string;
  contactNo: string;
};
// interface for student
export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  gender: 'male' | 'female'| 'other';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  profileImg?: string;
  isDeleted: boolean;
};

export type TStudentMethods = {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TStudent | null>;
};

export type TStudentModel = Model<
  TStudent,
  Record<string, never>,
  TStudentMethods
>;
