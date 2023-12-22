import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema(
  {
    qtype: {
      type: String,
      required: [true, "Question type is required!"],
      enum: ["MCQ", ""]
    },
    question: {
      type: String,
      required: [true, "Question statement is required!"]
    },
    answer: {
      type: String,
      required: [true, "Correct answer is required!"]
    },
    time: Number,
    required: [true, "Time limit is required!"]
  },
  {
    timestamps: true,
  }
);

const quizSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, "Code is required!"],
    },
    title: {
      type: String,
      required: [true, "Title is required!"],
      minlength: [1, 'Title must not be empty!'],
      maxlength: [64, 'Title must not exceed 64 characters!']
    },
    description: {
      type: String,
      required: [true, "Description is required!"],
      maxlength: [500, 'Description must not exceed 500 characters!']
    },
    visibility: {
      type: String,
      enum: ["Everyone", "Restricted", "Myself"],
      required: [true, "Visibility is required!"],
    },
    questions: [questionSchema],
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);

export default Quiz;