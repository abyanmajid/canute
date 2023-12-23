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
  return NextResponse.json({ quiz }, { status: 200 });
}

export async function DELETE(request: any, { params }: Params) {
  const { quizId } = params;
  await connectMongoDB();
  await Quiz.findByIdAndDelete(quizId);
  return NextResponse.json(
    { message: "Quiz has been successfully deleted!" },
    { status: 200 }
  );
}

export async function PUT(request: any, { params }: Params) {
  const { quizId } = params;
  const {
    newCode,
    newTitle,
    newDescription,
    newVisibility,
    newTime,
    newPassword,
  } = await request.json();
  await connectMongoDB();
  await Quiz.findByIdAndUpdate(
    { _id: quizId },
    {
      $set: {
        code: newCode,
        title: newTitle,
        description: newDescription,
        visibility: newVisibility,
        time: newTime,
        password: newPassword,
      },
    }
  );

  return NextResponse.json(
    { message: "Quiz has been successfully updated!" },
    { status: 200 }
  );
}
