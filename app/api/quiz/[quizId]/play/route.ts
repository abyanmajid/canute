import connectMongoDB from "@/lib/mongodb";
import Quiz from "@/models/quiz";
import { NextResponse } from "next/server";

interface Params {
  params: {
    quizId: String;
  };
}

export async function GET(request: any, { params }: Params) {
  const { quizId } = params;
  await connectMongoDB();
  const quiz = await Quiz.findOne({ _id: quizId });
  const questions = quiz.questions
  return NextResponse.json({ questions }, { status: 200 });
}