import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },

    nationality: {
      type: String,
      required: true,
    },
    marital_status: {
      type: String,
      enum: ["single", "married", "divorced", "engaged","other"],
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", userSchema);
export default UserModel;
