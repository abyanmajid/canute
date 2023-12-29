"use client";

import Link from "next/link";
import OpenBookIcon from "../icons/OpenBookIcon";
import PenIcon from "../icons/PenIcon";
import PlusIcon from "../icons/PlusIcon";
import TrashIcon from "../icons/TrashIcon";
import { useFormState } from "react-dom";
import { redirect } from "next/navigation";
import { useState } from "react";
import { deleteQuiz } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function QuizEntryForm({
  quizJSON,
  visitorId,
}: {
  quizJSON: any;
  visitorId: any;
}) {
  const quiz = JSON.parse(quizJSON);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const isGuest = visitorId === null;

  async function fetchPassword(prevState: any, formData: FormData) {
    const quizPassword = await formData.get("quizPassword");
    if (quizPassword === quiz.password || quiz.visibility !== "restricted") {
      const loggedIn = isGuest ? false : true;
      const user = loggedIn ? visitorId : await formData.get("guestName");
      redirect(`/quiz/${quiz._id}/play?loggedIn=${loggedIn}&user=${user}`);
    } else {
      setIncorrectPassword(true);
    }
  }

  const router = useRouter()
  async function handleDeleteQuiz() {
    const quizId = quiz._id.toString()
    await deleteQuiz(quizId);
    router.push(`/user/${quiz.creatorId}`);
  }

  const [state, formAction] = useFormState(fetchPassword, null);

  return (
    <form action={formAction}>
      <div className="mb-6">
        {isGuest ? (
          <div>
            <label
              htmlFor="guestName"
              className="block mb-2 text-sm font-medium text-white"
            >
              Username{" "}
              <mark className="px-1 text-white bg-gray-500 rounded">Guest</mark>{" "}
            </label>
            <input
              type="text"
              id="guestName"
              name="guestName"
              className="bg-gray-50 mb-4 border dark:bg-opacity-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-72 p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
              placeholder="Enter your username here..."
              maxLength={32}
              required
            />
          </div>
        ) : (
          ""
        )}
        {quiz.visibility === "restricted" ? (
          <div>
            <label
              htmlFor="quizPassword"
              className="block mb-2 text-sm font-medium text-yellow-500"
            >
              This quiz is password-locked!
            </label>
            <input
              type="password"
              id="quizPassword"
              name="quizPassword"
              className="bg-gray-50 border dark:bg-opacity-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-72 p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
              placeholder="Enter the password here..."
              required
            />
          </div>
        ) : (
          ""
        )}
        {incorrectPassword ? (
          <p className="mt-1 text-sm text-red-500" id="file_input_help">
            The password you entered is incorrect!
          </p>
        ) : (
          ""
        )}
      </div>
      <div>
        {quiz.questions.length === 0 ? (
          <p className="text-lg font-normal text-red-500 dark:text-red-400">
            This quiz cannot be played as it has no questions!
          </p>
        ) : (
          ""
        )}
        <div className="flex items-center mt-6">
          {quiz.questions.length !== 0 ? (
            <button
              type="submit"
              className="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-900"
            >
              <OpenBookIcon />
              Play
            </button>
          ) : (
            ""
          )}
          {quiz.questions.length === 0 ? (
            <button
              className="mr-2 inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center bg-opacity-50 text-opacity-50 text-white rounded-lg bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-900"
              disabled
            >
              <OpenBookIcon />
              Play
            </button>
          ) : (
            "'"
          )}

          {visitorId === quiz.creatorId ? (
            <Link
              href={`/quiz/${quiz._id}/edit`}
              className="mr-2 inline-flex justify-center items-center py-2.5 px-3 text-base font-medium text-center text-white rounded-lg bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-800"
            >
              Edit
              <PenIcon />
            </Link>
          ) : (
            ""
          )}

          {visitorId === quiz.creatorId ? (
            <Link
              href={`/quiz/${quiz._id}/questions`}
              className="mr-2 inline-flex justify-center items-center py-2.5 px-3 text-base font-medium text-center text-white rounded-lg bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
            >
              <PlusIcon />
              Add/Delete Question
            </Link>
          ) : (
            ""
          )}

          {visitorId === quiz.creatorId ? (
            <button
              onClick={handleDeleteQuiz}
              type="button"
              className="mr-2 inline-flex justify-center items-center py-2.5 px-3 text-base font-medium text-center text-white rounded-lg bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-900"
            >
              Delete Quiz
              <TrashIcon />
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </form>
  );
}
