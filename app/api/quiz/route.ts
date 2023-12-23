import connectMongoDB from "@/lib/mongodb";
import Quiz from "@/models/quiz";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const { code, title, description, visibility, time, password } = await request.json();
  await connectMongoDB();
  await Quiz.create({ code, title, description, visibility, time, password });
  return NextResponse.json(
    { message: "The quiz has been successfully created!" },
    { status: 201 }
  );
}
