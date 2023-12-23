import { Params } from "@/lib/constants";
import QuizForm from "@/components/forms/QuizForm";

async function getQuizById(quizId: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/quiz/${quizId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch quizz");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
}

async function getQuestionsByQuizId(quizId: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/quiz/${quizId}/play`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch quizz");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export default async function PlayQuiz({ params }: Params) {
  const { quizId } = params;
  const { quiz } = await getQuizById(quizId);
  const { questions } = await getQuestionsByQuizId(quizId);
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
    </section>
  );
}
