import { useState } from "react";
import { redirect } from "next/navigation";

import { Params } from "@/lib/constants";
import { getQuiz, getQuestions } from "@/lib/actions";

export default async function FetchData({ params }: Params) {
  redirect(`/quiz/${params.quizId}`);
}
