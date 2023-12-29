"use client";

import PenIcon from "@/components/icons/PenIcon";
import { useState } from "react";
import { useFormState } from "react-dom";
import { editQuiz } from "@/lib/actions";
import { convertToSeconds } from "@/lib/convertToSeconds";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function EditQuizForm({ quizJSON }: { quizJSON: any }) {
  const quiz = JSON.parse(quizJSON);
  console.log(quiz)
  const [title, setTitle] = useState(quiz.title);
  const [description, setDescription] = useState(quiz.description);
  const [time, setTime] = useState(quiz.time);
  const [visibility, setVisibility] = useState(quiz.visibility);

  function handleTitleChange(event: any) {
    setTitle(event.target.value);
  }

  function handleDescriptionChange(event: any) {
    setDescription(event.target.value);
  }

  function handleTimeChange(event: any) {
    setTime(event.target.value);
  }
  function handleVisibilityChange(event: any) {
    setVisibility(event.target.value);
  }

  async function fetchQuizDetails(prevState: any, formData: FormData) {
    const title = (await formData.get("title")) as string;
    const description = (await formData.get("description")) as string;
    const time = (await formData.get("time")) as string;
    const timeInSeconds = convertToSeconds(time);
    const visibility = (await formData.get("visibility")) as string;
    const password =
      (await visibility) === "restricted"
        ? (formData.get("password") as string)
        : "";
    await editQuiz(
      quiz._id.toString(),
      title,
      description,
      time,
      timeInSeconds,
      visibility.toLowerCase(),
      password
    );
    redirect(`/quiz/${quiz._id.toString()}`);
  }

  const [state, formAction] = useFormState(fetchQuizDetails, null);

  return (
    <>
      <form action={formAction}>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="sm:col-span-2">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-white"
            >
              Title
            </label>
            <input
              onChange={handleTitleChange}
              value={title}
              type="text"
              name="title"
              id="title"
              className=" border text-sm rounded-lg block w-full p-2.5 bg-opacity-50 bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-purple-500 focus:border-purple-500 focus:outline-none"
              placeholder="Title of the quiz"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-white"
            >
              Description
            </label>
            <textarea
              onChange={handleDescriptionChange}
              value={description}
              id="description"
              name="description"
              className="bg-opacity-50 block p-2.5 w-full text-sm rounded-lg border bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-purple-500 focus:border-purple-500 focus:outline-none"
              placeholder="Description of the quiz"
            ></textarea>
          </div>
          <div>
            <div className="sm:col-span-2 mb-6">
              <label
                htmlFor="time"
                className="block mb-2 text-sm font-medium text-white"
              >
                Time limit
              </label>
              <select
                id="time"
                name="time"
                className="border bg-opacity-50 text-sm rounded-lg block w-full p-2.5 bg-gray-800 border-gray-600 placeholder-gray-300 text-white focus:ring-purple-500 focus:border-purple-500 focus:outline-none"
                value={time}
                onChange={handleTimeChange}
              >
                <option value="0h 5m" className="bg-gray-800">
                  5 minutes
                </option>
                <option value="0h 10m" className="bg-gray-800">
                  10 minutes
                </option>
                <option value="0h 15m" className="bg-gray-800">
                  15 minutes
                </option>
                <option value="0h 30m" className="bg-gray-800">
                  30 minutes
                </option>
                <option value="0h 45m" className="bg-gray-800">
                  45 minutes
                </option>
                <option value="1h 0m" className="bg-gray-800">
                  1 hour
                </option>
                <option value="1h 15m" className="bg-gray-800">
                  1 hour 15 minutes
                </option>
                <option value="1h 30m" className="bg-gray-800">
                  1 hour 30 minutes
                </option>
                <option value="1h 45m" className="bg-gray-800">
                  1 hour 45 minutes
                </option>
                <option value="2h 0m" className="bg-gray-800">
                  2 hours
                </option>
                <option value="2h 15m" className="bg-gray-800">
                  2 hours 15 minutes
                </option>
                <option value="2h 30m" className="bg-gray-800">
                  2 hours 30 minutes
                </option>
                <option value="2h 45m" className="bg-gray-800">
                  2 hours 45 minutes
                </option>
                <option value="3h 0m" className="bg-gray-800">
                  3 hours
                </option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="visibility"
                className="block mb-2 text-sm font-medium text-white"
              >
                Visibility
              </label>
              <select
                id="visibility"
                name="visibility"
                className="border bg-opacity-50 text-sm rounded-lg block w-full p-2.5 bg-gray-800 border-gray-600 placeholder-gray-300 text-white focus:ring-purple-500 focus:border-purple-500 focus:outline-none"
                value={visibility}
                onChange={handleVisibilityChange}
              >
                <option value="everyone" className="bg-gray-800">
                  Everyone
                </option>
                <option value="restricted" className="bg-gray-800">
                  Restricted
                </option>
                <option value="myself" className="bg-gray-800">
                  Myself
                </option>
              </select>
            </div>
            {visibility === "restricted" && (
              <div className="sm:col-span-2">
                <label
                  htmlFor="password"
                  className="block mb-2 mt-6 bg-opacity-50 text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="border bg-opacity-50 text-sm rounded-lg block w-full p-2.5 bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-purple-500 focus:border-purple-500 focus:outline-none"
                  placeholder="Password to access the quiz"
                  required
                />
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-purple-700 rounded-lg focus:ring-4 focus:ring-purple-200 focus:ring-transparent hover:bg-purple-800"
        >
          Edit <PenIcon />
        </button>
        <Link href={`/user/${quiz.creatorId}`}>
          <button
            type="button"
            className="mx-2 border focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 border-purple-400 text-purple-400 hover:text-white hover:bg-purple-800 hover:border-transparent focus:ring-transparent"
          >
            Cancel
          </button>
        </Link>
      </form>
    </>
  );
}
