import { QuizType, QuestionType } from "@/lib/constants";

interface PlayQuizProps {
  quiz: QuizType;
  question: QuestionType;
  questionNumber: number;
}

export default function Question({
  quiz,
  question,
  questionNumber,
}: PlayQuizProps) {
  return (
    <>
      <h1 className="text-gray-900 dark:text-white text-4xl font-extrabold mb-2">
        Question {questionNumber}
      </h1>
      <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">
        {question.question}
      </p>
      <form>
        {question.options.map((option, index) => (
          <div
            key={index}
            className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700"
          >
            <input
              id={`bordered-radio-${index}`}
              type="radio"
              value={option}
              name="bordered-radio"
              className="w-4 h-4 text-purple-600 purple-accent bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor={`bordered-radio-${index}`}
              className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {option}
            </label>
          </div>
        ))}

        <button
          type="submit"
          className="mt-6 inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-transparent"
        >
          Next
        </button>
      </form>
    </>
  );
}
