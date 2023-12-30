import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  console.log("GOT HERE 1");
  const { username, email, typeAccount } = await request.json();
  console.log("GOT HERE 2");
  await connectMongoDB();
  console.log("GOT HERE 3");
  await User.create({ username, email, typeAccount });
  console.log("GOT HERE 4");
  return NextResponse.json({ message: "User Registered" }, { status: 201 });
  console.log("GOT HERE 5");
}
