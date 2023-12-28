import Link from "next/link";

import OpenBookIcon from "@/components/icons/OpenBookIcon";
import PenIcon from "@/components/icons/PenIcon";
import { Params } from "@/lib/constants";
import { getQuiz } from "@/lib/actions";
import { getQuestions } from "@/lib/actions";
import User from "@/models/user";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import TrashIcon from "@/components/icons/TrashIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import connectMongoDB from "@/lib/mongodb";
import Quiz from "@/models/quiz";
import QuestionEditDeleteBtns from "@/components/buttons/QuestionEditDeleteBtns";
import {redirect} from "next/navigation"

export default async function QuizQuestions({ params }: Params) {
  connectMongoDB();
  const quiz = await getQuiz(params.quizId);
  const questions = await getQuestions(params.quizId);
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
          <div className="flex items-center">
          <Link
            href={`/quiz/${quiz._id}/questions/create`}
            className="mr-2 inline-flex justify-center items-center py-2.5 px-3 text-base font-medium text-white bg-gradient-to-r to-pink-500 from-purple-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-transparent rounded-lg text-center"
          >
            <PlusIcon />
            Add New Question
          </Link>
          <Link
            href={`/quiz/${quiz._id}`}
            className="mr-2 inline-flex justify-center items-center py-2.5 px-3 text-base font-medium text-white bg-purple-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-transparent rounded-lg text-center"
          >
            Go Back
          </Link>
          </div>
          <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          {questions.map((question: any, questionIndex: any) => (
            <div
              key={questionIndex}
              className="border-gray-500  bg-gray-800 bg-opacity-35 border rounded-lg p-6 mb-8"
            >
              <h3 className="text-lg font-semibold text-white">
                Question {questionIndex + 1}{" "}
                {question.graded === true ? (
                  ""
                ) : (
                  <mark className="px-2 text-white bg-purple-600 rounded-xl">
                    Not Graded
                  </mark>
                )}
              </h3>
              <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">
                {question.question}
              </p>
              {question.qtype === "MCQ" &&
                question.options.map((option: any, optionIndex: any) => (
                  <div
                    key={optionIndex}
                    className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 my-2"
                  >
                    <input
                      id={`q${questionIndex}-o${optionIndex}`}
                      type="radio"
                      value={option}
                      name={`q${questionIndex}`}
                      className="w-4 h-4 text-purple-600 purple-accent bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      checked={option === question.answer}
                      disabled={option !== question.answer}
                    />
                    <label
                      htmlFor={`q${questionIndex}-o${optionIndex}`}
                      className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              {question.qtype === "Typed Answer" && (
                <div>
                  <label
                    htmlFor={`q${questionIndex}-ta`}
                    className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                  >
                    Your answer
                  </label>
                  <textarea
                    value={question.answer}
                    id={`q${questionIndex}-ta${questionIndex}`}
                    name={`q${questionIndex}`}
                    rows={4}
                    className="mb-4 dark:bg-opacity-50 block p-2.5 w-full text-base rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
                    placeholder="Write your answer here..."
                    disabled
                  ></textarea>
                </div>
              )}
              <div className="border-gray-500 text-white text-lg font-normal bg-gray-800 bg-opacity-35 border rounded-lg p-4">
                <span className="font-semibold">Correct Answer: </span>
                {question.answer}
              </div>
              <QuestionEditDeleteBtns
                quizId={quiz._id.toString()}
                questionId={question._id.toString()}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
