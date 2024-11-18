// interface of guardian
export type Guardian = {
  fathersName: string;
  fathersOccupation: string;
  mothersName: string;
  mothersOccupation: string;
};
// interface for user name
export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
// interface for localGuardian
export type LocalGuardian = {
  name: string;
  occupation: string;
  address: string;
  contactNo: string;
};
// interface for student
export type Student = {
  id: string;
  name: UserName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  profileImg?: string;
  isActive: 'active' | 'blocked';
};
