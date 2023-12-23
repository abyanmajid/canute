"use client";

import { useFormState } from "react-dom";

interface Props {
  questions: any;
}

export default function QuizForm({ questions }: Props) {
  async function fetchAnswers(prevState: any, formData: FormData) {
    const results = []
    for (let i = 0; i < questions.length; i++) {
      let answer = formData.get(`q${i}`)
      if (answer === null) {
        answer = ""
      }

      let correct = false
      if (answer === questions[i].answer) {
        correct = true
      }

      let result = {
        index: i,
        question: questions[i].question,
        options: questions[i].options,
        correct_answer: questions[i].answer,
        answer: answer,
        correct: correct
      }
      results.push(result)
    }
    console.log(results)
  }

  const [state, formAction] = useFormState(fetchAnswers, null);

  return (
    <form action={formAction}>
      {questions.map((question: any, questionIndex: any) => (
        <div key={questionIndex} className="mb-8">
          <h3 className="text-lg font-semibold text-white">
            Question {questionIndex + 1}
          </h3>
          <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">
            {question.question}
          </p>
          {question.qtype === "MCQ" &&
            question.options.map((option: any, optionIndex: any) => (
              <div
                key={optionIndex}
                className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 my-2"
              >
                <input
                  id={`q${questionIndex}-o${optionIndex}`}
                  type="radio"
                  value={option}
                  name={`q${questionIndex}`}
                  className="w-4 h-4 text-purple-600 purple-accent bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={`q${questionIndex}-o${optionIndex}`}
                  className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {option}
                </label>
              </div>
            ))}
          {question.qtype === "Typed Answer" && (
            <div>
              <label
                htmlFor={`q${questionIndex}-ta`}
                className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
              >
                Your answer
              </label>
              <textarea
                id={`q${questionIndex}-ta${questionIndex}`}
                name={`q${questionIndex}`}
                rows={4}
                className="mb-4 dark:bg-opacity-50 block p-2.5 w-full text-base rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
                placeholder="Write your answer here..."
              ></textarea>
            </div>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="mt-6 inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-transparent"
      >
        Submit
      </button>
    </form>
  );
}
