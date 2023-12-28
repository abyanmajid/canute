"use client";

import PenIcon from "@/components/icons/PenIcon";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import Link from "next/link";
import { stringToBoolean } from "@/lib/stringToBoolean";
import { editQuestion } from "@/lib/actions";
import { redirect } from "next/navigation";
import { getQuestions } from "@/lib/actions";

interface Props {
  quizId: any;
  questionJSON: any;
}

export default function EditQuestionForm({ quizId, questionJSON }: Props) {
  const question = JSON.parse(questionJSON);
  const questionId = question._id

  const [qtype, setQtype] = useState(question.qtype);
  const [questionStatement, setQuestionStatement] = useState(question.question);
  const [correctAnswer, setCorrectAnswer] = useState(question.answer);

  const initialAnswerIndex = question.options.indexOf(question.answer);

  const [mcqAnswer, setMcqAnswer] = useState(
    `option-${initialAnswerIndex + 1}`
  );

  const [noOptions, setNoOptions] = useState(2);

  useEffect(() => {
    if (question.qtype === "MCQ") {
      setNoOptions(question.options.length);
    }
  }, [question.qtype, question.options.length]);

  const [graded, setGraded] = useState(question.graded);

  function handleQuestionChange(event: any) {
    const newQuestionStatement = event.target.value;
    setQuestionStatement(newQuestionStatement);
  }

  function handleTypedAnswerChange(event: any) {
    const newTypedAnswer = event.target.value;
    setCorrectAnswer(newTypedAnswer);
  }

  function qtypeChangeHandler(event: any) {
    const newQtype = event.target.value;
    setQtype(newQtype);
  }

  function mcqAnswerHandler(event: any) {
    const newMcqAnswer = event.target.value;
    setMcqAnswer(newMcqAnswer);
  }

  function incrementNoOptions() {
    if (noOptions < 5) {
      setNoOptions((prevNoOptions: number) => prevNoOptions + 1);
    }
  }

  function decrementNoOptions() {
    if (noOptions > 2) {
      setNoOptions((prevNoOptions: number) => prevNoOptions - 1);
    }
  }

  function handleGradedCheckbox() {
    setGraded(!graded);
  }

  async function fetchQuestionDetails(prevState: any, formData: FormData) {
    const qtype = (await formData.get("qtype")) as string;
    const question = (await formData.get("question")) as string;

    const options = [];
    for (let i = 1; i <= noOptions; i++) {
      const option = (await formData.get(`option-${i}`)) as string;
      options.push(option);
    }

    let answer = null;
    if (qtype === "MCQ") {
      answer = (await formData.get(mcqAnswer)) as string;
    } else {
      answer = (await formData.get("typed-answer")) as string;
    }

    let graded: string | null | boolean = (await formData.get(
      "graded"
    )) as string;
    if (graded === "on") {
      graded = true;
    } else {
      graded = false;
    }
    
    await editQuestion(
      quizId,
      questionId,
      qtype,
      question,
      options,
      answer,
      graded
    );
    console.log(
      "qtype:",
      qtype,
      "\n",
      "question:",
      question,
      "\n",
      "options:",
      options,
      "\n",
      "answer:",
      answer,
      "\n",
      "graded:",
      graded
    );
    await redirect(`/quiz/${quizId}/questions`);
  }

  const [state, formAction] = useFormState(fetchQuestionDetails, null);

  return (
    <>
      <form action={formAction}>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div>
            <div className="sm:col-span-2">
              <label
                htmlFor="qtype"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Type of Question
              </label>
              <select
                id="qtype"
                name="qtype"
                className="bg-gray-50 border dark:bg-opacity-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
                value={qtype}
                onChange={qtypeChangeHandler}
              >
                <option value="MCQ" className="bg-gray-800">
                  Multiple Choice Question
                </option>
                <option value="Typed Answer" className="bg-gray-800">
                  Typed Answer
                </option>
              </select>
            </div>
            <div className="flex items-center mb-2 mt-6">
              <input
                id="graded"
                name="graded"
                type="checkbox"
                onChange={handleGradedCheckbox}
                className="w-4 h-4 purple-accent text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                checked={graded}
              />
              <label
                htmlFor="graded"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Graded
              </label>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="question"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Question (Problem Statement)
            </label>
            <textarea
              value={questionStatement}
              onChange={handleQuestionChange}
              id="question"
              name="question"
              className="dark:bg-opacity-50 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
              placeholder="The question to be answered"
            ></textarea>
          </div>
          {qtype !== "MCQ" ? (
            <div className="sm:col-span-2">
              <label
                htmlFor="typed-answer"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Correct Answer
              </label>
              <textarea
                value={correctAnswer}
                onChange={handleTypedAnswerChange}
                id="typed-answer"
                name="typed-answer"
                className="dark:bg-opacity-50 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
                placeholder="The correct answer to the question"
              ></textarea>
            </div>
          ) : (
            <div className="sm:col-span-2">
              {question.qtype === "MCQ"
                ? question.options.map((option: any, index: any) => (
                    <div key={index} className="sm:col-span-2 mb-6">
                      <label
                        htmlFor={`option-${index + 1}`}
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Option {index + 1}
                      </label>
                      <textarea
                        id={`option-${index + 1}`}
                        name={`option-${index + 1}`}
                        className="dark:bg-opacity-50 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
                        placeholder={`Type option ${index + 1} here...`}
                        defaultValue={option}
                      ></textarea>
                    </div>
                  ))
                : Array.from({ length: noOptions }, (_, index) => (
                    <div key={index} className="sm:col-span-2 mb-6">
                      <label
                        htmlFor={`option-${index + 1}`}
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Option {index + 1}
                      </label>
                      <textarea
                        id={`option-${index + 1}`}
                        name={`option-${index + 1}`}
                        className="dark:bg-opacity-50 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
                        placeholder={`Type option ${index + 1} here...`}
                      ></textarea>
                    </div>
                  ))}

              <div className="sm:col-span-2 mb-6">
                <label
                  htmlFor="mcq-answer"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Correct Answer
                </label>
                <select
                  id="mcq-answer"
                  name="mcq-answer"
                  className="bg-gray-50 border dark:bg-opacity-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-1/2 p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
                  value={mcqAnswer}
                  onChange={mcqAnswerHandler}
                  style={{ width: "50%" }}
                >
                  {question.qtype === "MCQ"
                    ? question.options.map((option: any, index: any) => (
                        <option
                          key={index}
                          value={`option-${index + 1}`}
                          className="bg-gray-800"
                        >
                          Option {index + 1}
                        </option>
                      ))
                    : Array.from({ length: noOptions }, (_, index) => (
                        <option
                          key={index}
                          value={`option-${index + 1}`}
                          className="bg-gray-800"
                        >
                          Option {index + 1}
                        </option>
                      ))}
                </select>
              </div>
              <button
                type="button"
                className="mr-2 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-transparent hover:bg-blue-800"
                onClick={incrementNoOptions}
              >
                Add Option
              </button>
              <button
                type="button"
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-gray-200 dark:focus:ring-transparent hover:bg-gray-800"
                onClick={decrementNoOptions}
              >
                Remove Option
              </button>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-purple-700 rounded-lg focus:ring-4 focus:ring-purple-200 dark:focus:ring-transparent hover:bg-purple-800"
        >
          Save Changes <PenIcon />
        </button>
        <Link href={`/quiz/${quizId}/questions`}>
          <button
            type="button"
            className="text-purple-700 mx-2 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-800 dark:hover:border-transparent dark:focus:ring-transparent"
          >
            Cancel
          </button>
        </Link>
      </form>
    </>
  );
}
