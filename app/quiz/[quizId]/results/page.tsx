import { Params } from "@/lib/constants";
import { getQuiz } from "@/lib/actions";
import { getQuestions } from "@/lib/actions";
import User from "@/models/user";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import connectMongoDB from "@/lib/mongodb";
import Quiz from "@/models/quiz";
import GetResultParams from "@/components/quiz/GetResultParams";

export default async function QuizResult({ params }: Params) {
  connectMongoDB();
  const quiz = await getQuiz(params.quizId);
  const quizJSON = JSON.stringify(quiz);
  const questions = await getQuestions(params.quizId);
  const questionsJSON = JSON.stringify(questions)

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
    <GetResultParams quizJSON={quizJSON} visitorId={visitorId}/>
  );
}
