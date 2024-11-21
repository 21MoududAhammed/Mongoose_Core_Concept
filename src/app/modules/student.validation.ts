import { z } from 'zod';

// UserName schema
const userNameSchema = z.object({
  firstName: z
    .string()
    .max(20, "First name can't exceed 20 characters.")
    .regex(/^[A-Z][a-z]+$/, 'First name must start with a capital letter.')
    .nonempty('First name is required.'),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .regex(/^[a-zA-Z]+$/, 'Last name must contain only letters.')
    .nonempty('Last name is required.'),
});

// Guardian schema
const guardianSchema = z.object({
  fathersName: z
    .string()
    .max(20, "Father's name can't exceed 20 characters.")
    .nonempty("Father's name is required."),
  fathersOccupation: z.string().nonempty("Father's occupation is required."),
  mothersName: z.string().nonempty("Mother's name is required."),
  mothersOccupation: z.string().nonempty("Mother's occupation is required."),
});

// Local Guardian schema
const localGuardianSchema = z.object({
  name: z.string().nonempty('Local guardian name is required.'),
  occupation: z.string().nonempty('Local guardian occupation is required.'),
  address: z.string().nonempty('Local guardian address is required.'),
  contactNo: z
    .string()
    .regex(/^\d+$/, 'Contact number must contain only digits.')
    .nonempty('Local guardian contact number is required.'),
});

// Student schema
export const studentValidationSchema = z.object({
  id: z.string().nonempty('ID is required.'),
  name: userNameSchema,
  password: z.string().nonempty('Password is required.'),
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({
      message: 'Gender must be one of male, female, or other.',
    }),
  }),
  dateOfBirth: z
    .string()
    .nonempty('Date of birth is required.')
    .refine(
      (date) => !isNaN(Date.parse(date)),
      'Date of birth must be a valid date in ISO format.',
    ),
  email: z
    .string()
    .email('Invalid email format.')
    .nonempty('Email is required.'),
  contactNo: z
    .string()
    .regex(/^\d+$/, 'Contact number must contain only digits.')
    .optional(),
  emergencyContactNo: z
    .string()
    .regex(/^\d+$/, 'Emergency contact number must contain only digits.')
    .nonempty('Emergency contact number is required.'),
  presentAddress: z.string().nonempty('Present address is required.'),
  permanentAddress: z.string().nonempty('Permanent address is required.'),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  isActive: z
    .enum(['active', 'blocked'], {
      errorMap: () => ({ message: 'Status must be active or blocked.' }),
    })
    .default('active'),
  profileImg: z.string().url('Profile image must be a valid URL.').optional(),
  isDeleted: z.boolean().default(false),
});
