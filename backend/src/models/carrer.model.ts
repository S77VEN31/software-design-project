// Mongoose
import mongoose, { Schema } from "mongoose";

const carrerModel = new Schema({
  name: {
    type: String,
  },
  code: {
    type: String,
  },
});
export default mongoose.model("Carrer", carrerModel);
