import EditQuizForm from "@/components/forms/EditQuizForm";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { notFound, redirect } from "next/navigation";
import Quiz from "@/models/quiz";
import User from "@/models/user";

interface Params {
  params: {
    quizId: string;
  };
}

export default async function EditQuiz({ params }: Params) {
  // @ts-ignore
  const session = await getServerSession(options);

  if (!session) {
    notFound();
  }
  const email = session?.user?.email;
  let typeAccount = "google";

  // @ts-ignore
  if (session?.user?.role === "GitHub User" || session?.user?.role === "admin") {
    typeAccount = "github";
  }

  const user = await User.findOne({ email: email, typeAccount: typeAccount });
  const quiz = await Quiz.findById(params.quizId);
  const quizJSON = JSON.stringify(quiz);

  if (user.banned) {
    redirect("/banned")
  }

  if (user._id.toString() !== quiz.creatorId) {
    notFound();
  }

  return (
    <>
      <section className="bg-center bg-no-repeat bg-edit-quiz-page bg-cover h-screen overflow-y-auto">
        <div className="py-12 px-4 mx-auto max-w-2xl lg:py-32">
          <h2 className="mb-4 text-xl font-bold text-white">
            Edit Quiz
          </h2>
          <EditQuizForm quizJSON={quizJSON} />
        </div>
      </section>
    </>
  );
}
