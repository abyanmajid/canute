import connectMongoDB from "@/lib/mongodb";
import Quiz from "@/models/quiz";
import { NextResponse } from "next/server";

interface Params {
  params: {
    quizId: String;
    questionId: String;
  };
}

export async function DELETE(request: any, { params }: Params) {
  const { quizId, questionId } = params;
  await connectMongoDB();
  await Quiz.updateOne(
    { _id: quizId },
    {
      $pull: {
        questions: { _id: questionId },
      },
    }
  );

  return NextResponse.json(
    { message: "Question has been successfully deleted!" },
    { status: 200 }
  );
}

export async function PUT(request: any, { params }: Params) {
  const { quizId, questionId } = params;
  const { newQtype, newQuestion, newOptions, newAnswer, newGraded } =
    await request.json();
  await connectMongoDB();
  await Quiz.updateOne(
    { _id: quizId, "questions._id": questionId },
    {
      $set: {
        "questions.$.qtype": newQtype,
        "questions.$.question": newQuestion,
        "questions.$.options": newOptions,
        "questions.$.answer": newAnswer,
        "questions.$.graded": newGraded,
      },
    }
  );

  return NextResponse.json(
    { message: "Question has been successfully updated!" },
    { status: 200 }
  );
}
