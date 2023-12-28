import EditQuestionForm from "@/components/forms/EditQuestionForm";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { notFound } from "next/navigation";
import Quiz from "@/models/quiz";
import User from "@/models/user";
import connectMongoDB from "@/lib/mongodb";

interface Params {
  params: {
    quizId: string;
    questionId: string;
  };
}

export default async function EditQuestion({ params }: Params) {
  // @ts-ignore
  const session = await getServerSession(options);
  await connectMongoDB();
  const quiz = await Quiz.findById({ _id: params.quizId });
  const question = quiz.questions.find(
    (question: { _id: { toString: () => string } }) =>
      question._id.toString() === params.questionId
  );

  const questionJSON = JSON.stringify(question)

  if (!session) {
    notFound();
  }
  const email = session?.user?.email;
  let typeAccount = "google";

  // @ts-ignore
  if (session?.user?.role === "GitHub User" || session?.user?.role === "admin") {
    typeAccount = "github";
  }

  const user = await User.findOne({ email: email, typeAccount: typeAccount });

  if (user._id.toString() !== quiz.creatorId) {
    notFound();
  }

  return (
    <>
      <section className="bg-center bg-no-repeat bg-create-page bg-cover h-screen overflow-y-auto">
        <div className="py-12 px-4 mx-auto max-w-2xl lg:py-32">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Edit Question
          </h2>
          <EditQuestionForm quizId={quiz._id} questionJSON={questionJSON}/>
        </div>
      </section>
    </>
  );
}
