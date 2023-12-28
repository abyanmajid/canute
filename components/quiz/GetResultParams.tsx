"use client";

import { useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import { stringToBoolean } from "@/lib/stringToBoolean";
import {postOnLeaderboard} from "@/lib/actions"

export default function GetResultParams({
  quizJSON,
  visitorId,
}: {
  quizJSON: string;
  visitorId: string | null;
}) {
  const quiz = JSON.parse(quizJSON);
  const leaderboard = quiz.leaderboard;

  const queryParams = useSearchParams();

  if (
    !queryParams.has("loggedIn") ||
    !queryParams.has("user") ||
    !queryParams.has("passkey")
  ) {
    notFound();
  }

  const loggedIn = stringToBoolean(queryParams.get("loggedIn") as string);
  const user = queryParams.get("user") as string;
  const passkey = queryParams.get("passkey") as string;

  if (
    (loggedIn !== true && loggedIn !== false) ||
    user === "" ||
    (loggedIn === true && user !== visitorId) ||
    (loggedIn === true && visitorId === null)
  ) {
    notFound();
  }

  const resultsParent = leaderboard.find(
    (item: any) => item.passkey === passkey
  );
  const results = resultsParent.results;
  const grade = Math.round(
    (resultsParent.numOfCorrectAnswers / resultsParent.numOfGradedQuestions) *
      100
  );
  console.log(resultsParent);
  console.log(results);

  async function handlePostOnLeaderboard() {
    const quizId = quiz._id.toString()
    const resultsId = resultsParent._id.toString() 
    await postOnLeaderboard(quizId, resultsId);
  }

  return (
    <section className="bg-center bg-no-repeat bg-about-page bg-cover h-screen overflow-y-auto">
      <div className="py-24 px-4 mx-auto max-w-screen-xl">
        <div className="border-gray-500  bg-gray-800 bg-opacity-35 border rounded-lg p-8 md:p-12 mb-8">
          <div className="text-center">
            <mark className="px-2 py-1 text-white bg-gradient-to-r to-pink-500 from-purple-500 rounded-xl text-sm">
              {quiz.code}
            </mark>{" "}
            <h1 className="text-gray-900 dark:text-white text-4xl font-extrabold mb-6 mt-4">
              Your Results
            </h1>
            <p className="justify-center mb-8">
              {grade >= 75 && (
                <mark className="px-4 py-2 text-white bg-green-600 rounded text-5xl font-bold">
                  {grade}%
                </mark>
              )}
              {grade >= 50 && grade < 75 && (
                <mark className="px-4 py-2 text-white bg-yellow-400 rounded text-5xl font-bold">
                  {grade}%
                </mark>
              )}
              {grade >= 25 && grade < 50 && (
                <mark className="px-4 py-2 text-white bg-orange-400 rounded text-5xl font-bold">
                  {grade}%
                </mark>
              )}
              {grade >= 0 && grade < 25 && (
                <mark className="px-4 py-2 text-white bg-red-600 rounded text-5xl font-bold">
                  {grade}%
                </mark>
              )}
            </p>
            <div className="justify-evenly">
              <button
                onClick={handlePostOnLeaderboard}
                type="button"
                className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-cyan-600 dark:hover:bg-cyan-700 focus:outline-none dark:focus:ring-cyan-800"
              >
                Post on Leaderboard
              </button>
            </div>
            <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <p className="text-lg font-normal text-white mb-6">
              You answered{" "}
              <mark className="px-1 text-white bg-purple-600 rounded">
                {resultsParent.numOfCorrectAnswers}/
                {resultsParent.numOfGradedQuestions}
              </mark>{" "}
              questions correctly.
            </p>
          </div>
          {results.map((result: any, questionIndex: any) => (
            <div
              key={questionIndex}
              className="border-gray-500  bg-gray-800 bg-opacity-35 border rounded-lg p-6 mb-8"
            >
              <h3 className="text-lg font-semibold text-white">
                Question {questionIndex + 1}{" "}
                {result.graded === true ? (
                  ""
                ) : (
                  <mark className="px-2 text-white bg-purple-600 rounded-xl">
                    Not Graded
                  </mark>
                )}
              </h3>
              <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">
                {result.question}
              </p>
              {result.options.length > 0 &&
                result.options.map((option: any, optionIndex: any) => (
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
                      checked={option === result.answer}
                      disabled={option !== result.answer}
                    />
                    <label
                      htmlFor={`q${questionIndex}-o${optionIndex}`}
                      className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              {result.options.length === 0 && (
                <div>
                  <label
                    htmlFor={`q${questionIndex}-ta`}
                    className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                  >
                    Your answer
                  </label>
                  <textarea
                    value={result.correct_answer}
                    id={`q${questionIndex}-ta${questionIndex}`}
                    name={`q${questionIndex}`}
                    rows={4}
                    className="mb-4 dark:bg-opacity-50 block p-2.5 w-full text-base rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
                    placeholder="Write your answer here..."
                    disabled
                  ></textarea>
                </div>
              )}
              <div className="border-gray-500 text-white text-lg font-normal bg-gray-800 bg-opacity-35 border rounded-lg p-4">
                <span className="font-semibold">Correct Answer: </span>
                {result.correct_answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
