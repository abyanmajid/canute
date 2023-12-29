import { Params } from "@/lib/constants";
import QuizForm from "@/components/forms/QuizForm";
import { getQuizByFetch, getQuestionsByFetch } from "@/lib/actions";
import { notFound, redirect } from "next/navigation";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function PlayQuiz({ params }: Params) {
  const { quizId } = params;
  const { quiz } = await getQuizByFetch(quizId);
  const { questions } = await getQuestionsByFetch(quizId);
  const { timeInSeconds } = quiz;

  if (questions.length === 0) {
    redirect(`/quiz/${quizId}`);
  }

  // @ts-ignore
  const session = await getServerSession(options);
  // @ts-ignore
  let visitorId: null | string = null;
  if (session) {
    // @ts-ignore
    const visitorRole = session?.user?.role;
    const visitorEmail = session?.user?.email;
    let visitorTypeAccount = "google";
    if (visitorRole === "GitHub user" || visitorRole === "admin") {
      visitorTypeAccount = "github";
    }
    const visitorUser = await User.findOne({
      email: visitorEmail,
      typeAccount: visitorTypeAccount,
    });

    if (visitorUser.banned) {
      redirect("/banned")
    }

    // @ts-ignore
    visitorId = visitorUser._id.toString();
  }

  if (quiz.visibility === "myself") {
    if (visitorId !== quiz.creatorId) {
      notFound();
    }
  }

  return (
    <section className="bg-center bg-no-repeat bg-play-quiz-page bg-cover h-screen overflow-y-auto">
      <div className="py-24 px-4 mx-auto max-w-screen-xl lg:py-28">
        <div className="border-gray-500  bg-gray-800 bg-opacity-35 border rounded-lg p-8 md:p-12 mb-8">
          <h1 className="text-gray-900 dark:text-white text-4xl font-extrabold mb-2">
            {quiz.title}
          </h1>
          <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">
            {quiz.description}
          </p>
          <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <QuizForm
            quizId={quizId}
            questions={questions}
            timeInSeconds={timeInSeconds}
            visitorId={visitorId}
          />
        </div>
      </div>
    </section>
  );
}
