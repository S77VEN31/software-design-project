// Mongoose
import mongoose, { Schema } from "mongoose";

const careerModel = new Schema({
  name: {
    type: String,
  },
  code: {
    type: String,
  },
});
export default mongoose.model("Career", careerModel);
