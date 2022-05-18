import mongoose from 'mongoose';

/** User mongoDb */
export interface IUser {
  id: mongoose.Types.ObjectId,
  name: string,
  login: string,
  passwordHash: string,
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  login: {
    type: String,
    unique: true,
    required: true
  },
  passwordHash: {
    type: String
  }
});

/** user mongoDb model */
export const userModel = mongoose.model('User', userSchema);