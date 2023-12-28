import mongoose, { Schema } from "mongoose";
import { number } from "zod";

const questionSchema = new Schema({
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
    type: [
      {
        type: String,
        trim: true,
      },
    ],
    validate: [(arr: any) => arr.length <= 5, "Options exceed the limit of 5!"],
    default: [],
  },
  answer: {
    type: String,
    required: [true, "Correct answer is required!"],
  },
  graded: {
    type: Boolean,
    required: [true, "Grading is required!"],
    default: true,
  },
});

const resultSchema = new Schema({
  loggedIn: {
    type: Boolean,
    required: [true, "loggedIn specification is required!"],
  },
  user: {
    type: String,
    default: "",
    required: [true, "Username is required!"],
  },
  results: {
    type: Array,
    required: [true, "Array of results is required!"],
  },
  numOfCorrectAnswers: {
    type: Number,
    required: [true, "Number of correct answers is required!"],
  },
  numOfGradedQuestions: {
    type: Number,
    required: [true, "Number of graded questions is required!"],
  },
  timeTakenInSeconds: {
    type: Number,
    required: [true, "Time taken is required!"],
  },
  showOnLeaderboard: {
    type: Boolean,
    default: false
  },
});

const quizSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, "Code is required!"],
    },
    temporaryCode: {
      type: String,
      default: "",
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
      required: [true, "Time limit is required!"],
    },
    timeInSeconds: {
      type: Number,
      default: 3600,
      required: [true, "Time limit is required!"],
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
    questions: {
      type: [questionSchema],
      default: [],
    },
    leaderboard: {
      type: [resultSchema],
      default: [],
    },
    creatorId: {
      type: String,
      required: [true, "Creator is required!"],
    },
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);

export default Quiz;
