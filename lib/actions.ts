"use server";

import connectMongoDB from "@/lib/mongodb";
import Quiz from "@/models/quiz";
import User from "@/models/user";
import bcrypt from "bcrypt";
import { generateRandomString } from "./generateCode";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export async function getQuiz(quizId: string) {
  await connectMongoDB();
  const quiz: any = await Quiz.findOne({ _id: quizId });
  return quiz;
}

export async function getQuestions(quizId: string) {
  "use server";
  await connectMongoDB();
  const quiz: any = await Quiz.findOne({ _id: quizId });
  return quiz ? quiz.questions : [];
}

export async function getResult(
  quizId: string,
  loggedIn: boolean,
  user: string,
  passkey: string
) {
  "use server";
  await connectMongoDB();
  const result = await Quiz.findOne(
    { _id: quizId },
    { leaderboard: { loggedIn: loggedIn, user: user, passkey: passkey } }
  );
  return result;
}

export async function createQuiz(
  username: string,
  title: string,
  description: string,
  time: string,
  timeInSeconds: number,
  visibility: string,
  password: string,
  email: string,
  typeAccount: string
) {
  await connectMongoDB();
  username = username.replace(/ /g, "-");
  let code = username + "#" + (await generateRandomString(6));
  const codeExists = await Quiz.exists({ code: code });
  while (codeExists) {
    code = username + "#" + (await generateRandomString(6));
  }
  const temporaryCode = "";
  const questions: object[] = [];
  const leaderboard: object[] = [];
  const user = await User.findOne({ email: email, typeAccount: typeAccount });
  const creatorId = user._id;
  await Quiz.create({
    code,
    temporaryCode,
    title,
    description,
    time,
    timeInSeconds,
    visibility,
    password,
    questions,
    leaderboard,
    creatorId,
  });
  const quiz = await Quiz.findOne({ code: code, creatorId: creatorId });
  const quizId = quiz._id;
  await User.findByIdAndUpdate(
    { _id: creatorId },
    { $push: { quizzes: quizId } }
  );
  redirect(`/quiz/${quizId}`);
}

export async function editQuiz(
  quizId: string,
  title: string,
  description: string,
  time: string,
  timeInSeconds: number,
  visibility: string,
  password: string
) {
  await connectMongoDB();
  await Quiz.findByIdAndUpdate(
    { _id: quizId },
    {
      $set: {
        title: title,
        description: description,
        time: time,
        timeInSeconds: timeInSeconds,
        visibility: visibility,
        password: password,
      },
    }
  );
}

export async function getQuizByFetch(quizId: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/quiz/${quizId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch quizz");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getQuestionsByFetch(quizId: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/quiz/${quizId}/play`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch quizz");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function createUser(
  username: string,
  email: string,
  password: string,
  typeAccount: string,
  banned: boolean
) {
  const hashedPassword = await bcrypt.hash(password, 12);
  await connectMongoDB();
  await User.create({ username, email, hashedPassword, typeAccount, banned });
}

export async function createQuestion(
  quizId: string,
  qtype: string,
  question: string,
  options: any,
  answer: string,
  graded: boolean
) {
  await connectMongoDB();
  if (qtype === "MCQ") {
    await Quiz.findByIdAndUpdate(
      { _id: quizId.toString() },
      {
        $push: {
          questions: {
            qtype: qtype,
            question: question,
            options: options,
            answer: answer,
            graded: graded,
          },
        },
      }
    );
  } else if (qtype === "Typed Answer") {
    await Quiz.findByIdAndUpdate(
      { _id: quizId.toString() },
      {
        $push: {
          questions: {
            qtype: qtype,
            question: question,
            options: [],
            answer: answer,
            graded: graded,
          },
        },
      }
    );
  }
}

export async function editQuestion(
  quizId: string,
  questionId: string,
  qtype: string,
  question: string,
  options: any,
  answer: string,
  graded: boolean
) {
  await connectMongoDB();
  if (qtype === "MCQ") {
    await Quiz.updateOne(
      { _id: quizId, "questions._id": questionId },
      {
        $set: {
          "questions.$.qtype": qtype,
          "questions.$.question": question,
          "questions.$.options": options,
          "questions.$.answer": answer,
          "questions.$.graded": graded,
        },
      }
    );
  } else if (qtype === "Typed Answer") {
    await Quiz.updateOne(
      { _id: quizId, "questions._id": questionId },
      {
        $set: {
          "questions.$.qtype": qtype,
          "questions.$.question": question,
          "questions.$.options": [],
          "questions.$.answer": answer,
          "questions.$.graded": graded,
        },
      }
    );
  }
}

export async function deleteQuestion(questionId: string, quizId: string) {
  "use server";
  await connectMongoDB();
  await Quiz.updateOne(
    { _id: quizId },
    {
      $pull: {
        questions: { _id: questionId },
      },
    }
  );
}

export async function saveQuizResult(
  quizId: string,
  loggedIn: boolean,
  user: string,
  results: any,
  numOfCorrectAnswers: number,
  numOfGradedQuestions: number,
  timeTakenInSeconds: number
) {
  const registeredUser = (loggedIn ? await User.findById(user) : "")
  const registeredUsername = (registeredUser !== "" ? registeredUser.username : "")
  const passkey = uuidv4();
  await connectMongoDB();
  await Quiz.findByIdAndUpdate(
    { _id: quizId },
    {
      $push: {
        leaderboard: {
          loggedIn: loggedIn,
          user: user,
          registeredUsername: registeredUsername,
          results: results,
          numOfCorrectAnswers: numOfCorrectAnswers,
          numOfGradedQuestions: numOfGradedQuestions,
          timeTakenInSeconds: timeTakenInSeconds,
          showOnLeaderboard: false,
          passkey: passkey,
        },
      },
    }
  );
  redirect(
    `/quiz/${quizId}/results?loggedIn=${loggedIn}&user=${user}&passkey=${passkey}`
  );
}

export async function getVisitorUser(
  visitorEmail: string,
  visitorTypeAccount: string
) {
  "use server";
  await connectMongoDB();
  const visitorUser = await User.findOne({
    email: visitorEmail,
    typeAccount: visitorTypeAccount,
  });
  return visitorUser;
}

export async function postOnLeaderboard(quizId: string, resultsId: string) {
  "use server";
  await connectMongoDB();
  await Quiz.updateOne(
    { _id: quizId, "leaderboard._id": resultsId },
    {
      $set: {
        "leaderboard.$.showOnLeaderboard": true,
      },
    }
  );
  await redirect(`/quiz/${quizId}`)
}
