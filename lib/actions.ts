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
