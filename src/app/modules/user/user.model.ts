import mongoose, { Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: ['admin', 'student', 'faculty'] },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// password hashing 
userSchema.pre('save', async function (next) {
  try {
    const saltRounds = Number(config.bcrypt_salt_rounds);
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (err) {
    next(err);
  }
});

export const UserModel = mongoose.model<TUser>('User', userSchema);
