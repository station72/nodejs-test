import mongoose from 'mongoose';

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


export const connectDb = async (): Promise<mongoose.Mongoose> => { 
  return await mongoose.connect('mongodb://root:rootpassword@localhost:27017/db', {
    authSource: 'admin'
  })
}

export const userModel = mongoose.model('User', userSchema);
