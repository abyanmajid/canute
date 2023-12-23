import connectMongoDB from "@/lib/mongodb";
import Quiz from "@/models/quiz";
import { NextResponse } from "next/server";

interface Params {
  params: {
    quizId: String;
  };
}

export async function POST(request: any, { params }: Params) {
  const { quizId } = params;
  const { qtype, question, options, answer, graded } = await request.json();
  const newQuestion = {
    qtype: qtype,
    question: question,
    options: options,
    answer: answer,
    graded: graded,
  };

  console.log(newQuestion);

  await connectMongoDB();

  await Quiz.findByIdAndUpdate(
    { _id: quizId },
    { $push: { questions: newQuestion } },
    { new: true, runValidators: true }
  );

  return NextResponse.json(
    { message: "Question has been successfully created!" },
    { status: 200 }
  );
}
