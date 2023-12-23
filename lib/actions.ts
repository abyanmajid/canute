"use server";

import connectMongoDB from "@/lib/mongodb";
import Quiz from "@/models/quiz";

export async function getQuiz(quizId: string) {
  await connectMongoDB();
  const quiz: any = await Quiz.findOne({ _id: quizId });
  return quiz;
}

export async function getQuestions(quizId: string) {
  await connectMongoDB();
  const quiz: any = await Quiz.findOne({ _id: quizId });
  return quiz ? quiz.questions : [];
}

export async function createQuiz(
  code: string,
  title: string,
  description: string,
  time: string,
  timeInSeconds: number,
  visibility: string,
  password: string
) {
  await connectMongoDB();
  await Quiz.create({
    code,
    title,
    description,
    time,
    timeInSeconds,
    visibility,
    password,
  });
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