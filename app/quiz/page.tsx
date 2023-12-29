import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";

export default async function Quiz() {
  // @ts-ignore
  const session = await getServerSession(options);
  if (session) {
    // @ts-ignore
    const email = session?.user?.email;
    // @ts-ignore
    const role = session?.user?.role;
    let typeAccount = "google";
    if (role === "GitHub user" || role === "admin") {
      typeAccount = "github";
    }
    await connectMongoDB();
    const user = await User.findOne({
      email: email,
      typeAccount: typeAccount,
    });

    if (user.banned) {
      redirect("/banned");
    }
  }
  return redirect("/");
}
