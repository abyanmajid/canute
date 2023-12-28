import Link from "next/link";

import OpenBookIcon from "@/components/icons/OpenBookIcon";
import PenIcon from "@/components/icons/PenIcon";
import { Params } from "@/lib/constants";
import { getQuiz } from "@/lib/actions";
import User from "@/models/user";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import TrashIcon from "@/components/icons/TrashIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import { useFormState } from "react-dom";
import QuizEntryForm from "@/components/forms/QuizEntryForm";
import { formatTimeLong } from "@/lib/formatTime";

export default async function QuizEntryPoint({ params }: Params) {
  const quiz = await getQuiz(params.quizId);
  const quizJSON = JSON.stringify(quiz)
  const user = await User.findById({ _id: quiz.creatorId });

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
    // @ts-ignore
    visitorId = visitorUser._id.toString();
  }

  if (quiz.visibility === "myself") {
    if (visitorId !== quiz.creatorId) {
      notFound();
    }
  }

  async function fetchPassword(prevState: any, formData: FormData) {
    const quizPassword = await formData.get("quizPassword")
    console.log(quizPassword)
  }

  return (
    <section className="bg-center bg-no-repeat bg-about-page bg-cover h-screen overflow-y-auto">
      <div className="py-24 px-4 mx-auto max-w-screen-xl">
        <div className="border-gray-500  bg-gray-800 bg-opacity-35 border rounded-lg p-8 md:p-12 mb-8">
          <Link href={`/user/${user._id}`}>
            <span className="bg-purple-100 text-purple-800 text-sm font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-gray-700 dark:text-purple-400 mb-2">
              <svg
                className="w-2.5 h-2.5 me-1.5 mb-1.5 mt-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 14 18"
              >
                <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
              </svg>
              {user.username}
            </span>
          </Link>
          <h1 className="text-gray-900 dark:text-white text-4xl font-extrabold mb-2">
            {quiz.title}{" "}
            <mark className="px-2 text-white bg-gradient-to-r to-pink-500 from-purple-500 rounded-xl text-lg">
              {quiz.code}
            </mark>{" "}
          </h1>
          <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">
            {quiz.description}
          </p>
          <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-2">
            <span className="font-semibold text-white">Time limit:</span>{" "}
            {formatTimeLong(quiz.time)}
          </p>
          <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-2">
            <span className="font-semibold text-white">Questions:</span>{" "}
            {quiz.questions.length}
          </p>
          <QuizEntryForm quizJSON={quizJSON} visitorId={visitorId}/>
        </div>
      </div>
    </section>
  );
}
