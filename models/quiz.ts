import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema(
  {
    qtype: {
      type: String,
      required: [true, "Question type is required!"],
      enum: ["MCQ", "Typed Answer"],
    },
    question: {
      type: String,
      required: [true, "Question statement is required!"],
    },
    options: {
      type: [{
        type: String,
        trim: true,
      }],
      validate: [(arr: any) => arr.length <= 5, "Options exceed the limit of 5!"],
      default: []
    },
    answer: {
      type: String,
      required: [true, "Correct answer is required!"],
    },
    graded: {
      type: Boolean,
      required: [true, "Grading is required!"],
      default: true,
    }
  },
);

const quizSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, "Code is required!"]
    },
    title: {
      type: String,
      required: [true, "Title is required!"],
      minLength: [1, "Title must not be empty!"],
      maxlength: [64, "Title must not exceed 64 characters!"],
    },
    description: {
      type: String,
      required: [true, "Description is required!"],
      maxLength: [500, "Description must not exceed 500 characters!"],
    },
    time: {
      type: String,
      default: "1h",
      required: [true, "Time limit is required!"]
    },
    timeInSeconds: {
      type: Number,
      default: 3600,
      required: [true, "Time limit is required!"]
    },
    visibility: {
      type: String,
      enum: ["everyone", "restricted", "myself"],
      required: [true, "Visibility is required!"],
    },
    password: {
      type: String,
      default: "",
      maxLength: [32, "Password must not exceed 32 characters!"],
    },
    questions: [questionSchema],
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);

export default Quiz;
