import CreateQuizForm from "@/components/forms/CreateQuizForm";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { notFound, redirect } from "next/navigation";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";

export default async function CreateQuiz() {
  // @ts-ignore
  const session = await getServerSession(options);

  if (!session) {
    notFound();
  }

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

  const username = session?.user?.name;
  const email = session?.user?.email;
  let typeAccount = "google";

  // @ts-ignore
  if (session?.user?.role === "GitHub User" || session?.user?.role === "admin") {
    typeAccount = "github";
  }

  return (
    <>
      <section className="bg-center bg-no-repeat bg-create-page bg-cover h-screen overflow-y-auto">
        <div className="py-12 px-4 mx-auto max-w-2xl lg:py-32">
          <h2 className="mb-4 text-xl font-bold text-white">
            Create a New Quiz
          </h2>
          <CreateQuizForm
            username={username}
            email={email}
            typeAccount={typeAccount}
          />
        </div>
      </section>
    </>
  );
}
