import mongoose from "mongoose";
import { AppSettings } from "../app.settings";

export const connectDb = async (): Promise<mongoose.Mongoose> => {
  return await mongoose.connect(AppSettings.mongoDb.connectionString, {
    authSource: "admin",
  });
};
