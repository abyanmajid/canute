import { Params } from "@/lib/constants";
import QuizForm from "@/components/forms/QuizForm";
import { getQuizByFetch, getQuestionsByFetch } from "@/lib/actions";
import Timer from "@/components/partials/Timer";

export default async function PlayQuiz({ params }: Params) {
  const { quizId } = params;
  const { quiz } = await getQuizByFetch(quizId);
  const { questions } = await getQuestionsByFetch(quizId);
  const { timeInSeconds } = quiz;
  console.log(quiz);

  return (
    <section className="bg-center bg-no-repeat bg-about-page bg-cover h-screen overflow-y-auto">
      <div className="py-24 px-4 mx-auto max-w-screen-xl lg:py-28">
        <div className="border-gray-500  bg-gray-800 bg-opacity-35 border rounded-lg p-8 md:p-12 mb-8">
          <h1 className="text-gray-900 dark:text-white text-4xl font-extrabold mb-2">
            {quiz.title}
          </h1>
          <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">
            {quiz.description}
          </p>
          <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <QuizForm questions={questions} />
        </div>
      </div>
      <Timer timeInSeconds={5}/>
    </section>
  );
}
