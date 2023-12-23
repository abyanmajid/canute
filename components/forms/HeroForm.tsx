"use client";

import { useFormState } from "react-dom";
import { redirect } from "next/navigation";

import OpenBookIcon from "@/components/icons/OpenBookIcon";
import PenIcon from "@/components/icons/PenIcon";
import Link from "next/link";

export default function HeroForm() {
  async function fetchQuiz(prevState: any, formData: FormData) {
    const quizCode = await formData.get("quizCode");
    redirect(`/quiz/${quizCode}`)
  }

  const [state, formAction] = useFormState(fetchQuiz, null);

  return (
    <>
      <form className="flex items-center" action={formAction}>
        <div className="relative w-full">
          <input
            type="text"
            id="quizCode"
            name="quizCode"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
            placeholder="Enter code here!"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-purple-700 rounded-lg border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-transparent dark:bg-purple-600 dark:hover:bg-purple-700"
        >
          <OpenBookIcon />
          Play
        </button>
      </form>

      <div className="separator"></div>
      <Link href="/quiz/create">
        <button
          type="submit"
          className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-transparent rounded-lg text-center"
        >
          Create
          <PenIcon />
        </button>
      </Link>
    </>
  );
}
