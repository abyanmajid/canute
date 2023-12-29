import { notFound } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import User from "@/models/user";
import connectMongoDB from "@/lib/mongodb";

export default async function Banned() {
  // @ts-ignore
  const session = await getServerSession(options);
  if (!session) {
    notFound();
  }
  if (session) {
    // @ts-ignore
    const visitorRole = session?.user?.role;
    const visitorEmail = session?.user?.email;
    let visitorTypeAccount = "google";
    if (visitorRole === "GitHub user" || visitorRole === "admin") {
      visitorTypeAccount = "github";
    }
    await connectMongoDB();
    const visitorUser = await User.findOne({
      email: visitorEmail,
      typeAccount: visitorTypeAccount,
    });

    if (!visitorUser.banned) {
      notFound();
    }
  }
  return (
    <>
      <section className="bg-center bg-no-repeat bg-about-page bg-cover h-screen">
        <div
          id="about"
          className="px-4 mx-auto max-w-screen-xl text-center py-32 lg:py-64"
        >
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white">
            This account has been{" "}
            <span className="text-red-400 underline">banned!</span>
          </h1>
          <p className="mb-6 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400">
            If you are certain this is a mistake, please submit a ban appeal to{" "}
            <span className="text-purple-400">abyan@abydyl.net</span>
          </p>
        </div>
      </section>
    </>
  );
}
