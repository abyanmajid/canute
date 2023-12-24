import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const { username, email, typeAccount } = await request.json();
  await connectMongoDB();
  await User.create({ username, email, typeAccount });
  return NextResponse.json({ message: "User Registered" }, { status: 201 });
}