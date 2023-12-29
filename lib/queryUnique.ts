"use server";

import User from "@/models/user";
import connectMongoDB from "./mongodb";

export async function isUsernameTaken(str: string) {
  await connectMongoDB();
  const exists = await User.exists({
    username: { $regex: str, $options: "i" },
  });
  return exists;
}

export async function isEmailTaken(email: string, typeAccount: string) {
  await connectMongoDB();
  const exists = await User.exists({
    email: { $regex: email, $options: "i" },
    typeAccount: {$regex: typeAccount, $options: "i"}
  });
  return exists;
}
