"use client"

import Link from "next/link";
import PenIcon from "../icons/PenIcon";
import TrashIcon from "../icons/TrashIcon";
import { deleteQuestion } from "@/lib/actions";
import {useRouter} from "next/navigation"

interface Props {
  quizId: any;
  questionId: any;
}

export default function QuestionEditDeleteBtns({
  quizId,
  questionId,
}: Props) {
  const router = useRouter();

  async function handleDelete() {
    await deleteQuestion(questionId, quizId)
    await router.refresh();
  }

  return (
    <div className="flex items-center mt-6">
      <Link
        href={`/quiz/${quizId}/questions/${questionId}/edit`}
        className="mr-2 inline-flex justify-center items-center py-2.5 px-3 text-base font-medium text-center text-white rounded-lg bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-800"
      >
        Edit
        <PenIcon />
      </Link>
      <button
        onClick={handleDelete}
        type="button"
        className="mr-2 inline-flex justify-center items-center py-2.5 px-3 text-base font-medium text-center text-white rounded-lg bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-900"
      >
        Delete
        <TrashIcon />
      </button>
    </div>
  );
}
