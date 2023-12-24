import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      minLength: 1,
      maxLength: 16,
      required: [true, "Username is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
    },
    typeAccount: {
      type: String,
      required: [true, "Account type is required!"],
      enum: ["google", "github"]
    },
    banned: {
      type: Boolean,
      default: false,
    },
    quizzes: {
      type: [{
        type: String,
        trim: true,
      }],
      default: []
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
