"use client";

import { useFormState } from "react-dom";
import Timer from "@/components/partials/Timer";
import { useState, useEffect, useRef } from "react";
import { notFound, redirect, useSearchParams } from "next/navigation";
import { saveQuizResult } from "@/lib/actions";
import { stringToBoolean } from "@/lib/stringToBoolean";

interface Props {
  quizId: string;
  questions: any;
  timeInSeconds: number;
  visitorId: string | null;
}

export default function QuizForm({
  quizId,
  questions,
  timeInSeconds,
  visitorId,
}: Props) {
  const buttonRef: any = useRef();
  const [time, setTime] = useState<number>(timeInSeconds);

  const queryParams = useSearchParams();
  if (!queryParams.has("loggedIn") || !queryParams.has("user")) {
    notFound();
  }
  const loggedIn = stringToBoolean(queryParams.get("loggedIn") as string);
  const user = queryParams.get("user") as string;

  if (
    (loggedIn !== true && loggedIn !== false) ||
    user === "" ||
    (loggedIn === true && user !== visitorId) ||
    (loggedIn === true && visitorId === null)
  ) {
    notFound();
  }

  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else {
      buttonRef.current.click();
    }
  }, [time]);

  async function fetchAnswers(prevState: any, formData: FormData) {
    const results = [];
    for (let i = 0; i < questions.length; i++) {
      let answer = await formData.get(`q${i}`);
      if (answer === null) {
        answer = "";
      }

      let correct = false;
      if (answer === questions[i].answer) {
        correct = true;
      }

      let result = {
        index: i,
        question: questions[i].question,
        options: questions[i].options,
        correct_answer: questions[i].answer,
        graded: questions[i].graded,
        answer: answer,
        correct: correct,
      };
      results.push(result);
    }
    const timeTakenInSeconds = timeInSeconds - time;
    let numOfCorrectAnswers = 0;
    let numOfGradedQuestions = 0;
    for (let result of results) {
      if (result.graded === true) {
        if (result.correct === true) {
          numOfCorrectAnswers += 1;
        }
        numOfGradedQuestions += 1;
      }
    }
    
    await saveQuizResult(
      quizId,
      loggedIn,
      user,
      results,
      numOfCorrectAnswers,
      numOfGradedQuestions,
      timeTakenInSeconds
    );
  }

  const [state, formAction] = useFormState(fetchAnswers, null);

  return (
    <>
      <form action={formAction}>
        {questions.map((question: any, questionIndex: any) => (
          <div
            key={questionIndex}
            className="mb-8 border-gray-500  bg-gray-800 bg-opacity-35 border rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold text-white">
              Question {questionIndex + 1}{" "}
              {question.graded === true ? (
                ""
              ) : (
                <mark className="px-2 text-white bg-purple-600 rounded-xl">
                  Not Graded
                </mark>
              )}
            </h3>
            <p className="text-lg font-normal text-gray-400 mb-6">
              {question.question}
            </p>
            {question.qtype === "MCQ" &&
              question.options.map((option: any, optionIndex: any) => (
                <div
                  key={optionIndex}
                  className="flex items-center ps-4 border rounded border-gray-700 my-2"
                >
                  <input
                    id={`q${questionIndex}-o${optionIndex}`}
                    type="radio"
                    value={option}
                    name={`q${questionIndex}`}
                    className="w-4 h-4 text-purple-600 purple-accent focus:ring-purple-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                  />
                  <label
                    htmlFor={`q${questionIndex}-o${optionIndex}`}
                    className="w-full py-4 ms-2 text-sm font-medium text-gray-300"
                  >
                    {option}
                  </label>
                </div>
              ))}
            {question.qtype === "Typed Answer" && (
              <div>
                <label
                  htmlFor={`q${questionIndex}-ta`}
                  className="block mb-2 text-base font-medium text-white"
                >
                  Your answer
                </label>
                <textarea
                  id={`q${questionIndex}-ta${questionIndex}`}
                  name={`q${questionIndex}`}
                  rows={4}
                  className="mb-4 bg-opacity-50 block p-2.5 w-full text-base rounded-lg border bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-purple-500 focus:border-purple-500 focus:outline-none"
                  placeholder="Write your answer here..."
                ></textarea>
              </div>
            )}
          </div>
        ))}

        <button
          ref={buttonRef}
          type="submit"
          className="mt-6 inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-transparent"
        >
          Submit
        </button>
      </form>
      <Timer time={time} />
    </>
  );
}
