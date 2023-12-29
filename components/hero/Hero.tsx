import HeroForm from "@/components/forms/HeroForm";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import User from "@/models/user";
import connectMongoDB from "@/lib/mongodb";
import { redirect } from "next/navigation";

export default async function Hero() {
  // @ts-ignore
  const session = await getServerSession(options);
  // @ts-ignore
  let userId = null;
  if (session) {
    // @ts-ignore
    const role = session?.user?.role;
    const email = session?.user?.email;
    let typeAccount = "google";
    if (role === "GitHub user" || role === "admin") {
      typeAccount = "github";
    }
    await connectMongoDB();
    // const user = await User.findOne({
    //   email: email,
    //   typeAccount: typeAccount,
    // });
    
    const maxAttempts = 5;
    let attempts = 0
    let user = null
    // while (user === null && attempts < maxAttempts) {
    //   user = await User.findOne({ email: email, typeAccount: typeAccount });

    //   if (user === null) {
    //     await new Promise(resolve => setTimeout(resolve, 3000)); // delay
    //     attempts++;
    //   } else if (user.banned) {
    //     redirect("/banned")
    //   }
    // }

    while (user === null) {
      user = await User.findOne({ email: email, typeAccount: typeAccount });
    }
    
    if (user.banned) {
      redirect("/banned")
    }

    // @ts-ignore
    userId = user._id.toString();
  }

  return (
    <section className="bg-center bg-no-repeat bg-home-page bg-cover h-screen">
      <div className="px-4 mx-auto max-w-screen-xl text-center py-32 lg:py-60">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
          Start by{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-pink-500 from-purple-500">
            testing
          </span>{" "}
          <span className="underline">your limits</span>.
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
          Create interactive quizzes for yourself, your students, and others
          here with{" "}
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-pink-500 from-purple-500">
            Canute
          </span>
          .
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <HeroForm userId={userId} />
        </div>
      </div>
    </section>
  );
}
