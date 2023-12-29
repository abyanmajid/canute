"use client"

import Link from "next/link";
import TrashIcon from "../icons/TrashIcon";
import PenIcon from "../icons/PenIcon";
import { deleteQuiz } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function CreatorButtons({
  quizId,
  visitorId,
  creatorId,
}: {
  quizId: string;
  visitorId: string | null;
  creatorId: string;
}) {
  const router = useRouter();
  async function handleDeleteQuiz() {
    await deleteQuiz(quizId);
    await router.refresh();
  }

  return (
    <div>
      {visitorId === creatorId ? (
        <Link
          href={`/quiz/${quizId}`}
          className="mr-2 inline-flex justify-center items-center py-2.5 px-3 text-base font-medium text-center text-white rounded-lg bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-800"
        >
          Edit
          <PenIcon />
        </Link>
      ) : (
        ""
      )}
      {visitorId === creatorId ? (
        <button
          onClick={handleDeleteQuiz}
          type="button"
          className="mr-2 inline-flex justify-center items-center py-2.5 px-3 text-base font-medium text-center text-white rounded-lg bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-900"
        >
          Delete
          <TrashIcon />
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
