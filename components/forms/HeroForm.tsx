"use client";

import { useFormState } from "react-dom";
import { redirect } from "next/navigation";

import OpenBookIcon from "@/components/icons/OpenBookIcon";
import PenIcon from "@/components/icons/PenIcon";
import Link from "next/link";
import {findQuiz} from "@/lib/actions"

export default function HeroForm({userId}: {userId: string}) {

  async function fetchQuiz(prevState: any, formData: FormData) {
    const quizCode = await formData.get("quizCode") as string;
    await findQuiz(quizCode)
    // redirect(`/quiz/${quizCode}`);
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
          className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white rounded-lg border border-purple-700 focus:ring-4 focus:outline-none focus:ring-transparent bg-purple-600 hover:bg-purple-700"
        >
          <OpenBookIcon />
          Play
        </button>
      </form>

      <div className="separator"></div>
      {userId !== null ?       <Link href={`/user/${userId}`}>
        <button
          type="button"
          className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-transparent rounded-lg text-center"
        >
          Create
          <PenIcon />
        </button>
      </Link> : <Link href="/api/auth/signin?callbackUrl=/">
        <button
          type="button"
          className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-transparent rounded-lg text-center"
        >
          Create
          <PenIcon />
        </button>
      </Link>}
    </>
  );
}
