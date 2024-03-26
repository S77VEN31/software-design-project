// Initiate connection to MongoDB database
import mongoose from "mongoose";
// MongoDB URI
import { MONGODB_URI } from "./settings";

export const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};
