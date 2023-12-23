"use client";

import PenIcon from "@/components/icons/PenIcon";
import { useState } from "react";
import { useFormState } from "react-dom";
import { generateRandomString } from "@/lib/generateCode";
import { createQuiz } from "@/lib/actions";
import { redirect } from "next/navigation";
import { convertToSeconds } from "@/lib/convertToSeconds";

export default function CreateQuizForm() {
  const [visibility, setVisibility] = useState("everyone");
  const [time, setTime] = useState("1h 0m");

  function visibilityChangeHandler(event: any) {
    const newVisibility = event.target.value;
    setVisibility(newVisibility);
  }

  function timeChangeHandler(event: any) {
    const newTime = event.target.value;
    setTime(newTime);
  }

  async function fetchQuizDetails(prevState: any, formData: FormData) {
    const code = "Kinderheim-" + (await generateRandomString(6));
    const title = (await formData.get("title")) as string;
    const description = (await formData.get("description")) as string;
    const time = (await formData.get("time")) as string;
    const timeInSeconds = convertToSeconds(time);
    const visibility = (await formData.get("visibility")) as string;
    const password =
      (await visibility) === "restricted"
        ? (formData.get("password") as string)
        : "";
    await createQuiz(code, title, description, time, timeInSeconds, visibility.toLowerCase(), password)
    // console.log(
    //   `code: ${code}, title: ${title}, description: ${description}, time: ${time}, timeInSeconds: ${timeInSeconds}, visibility: ${visibility}, password: ${password}`
    // );
    redirect("/");
  }

  const [state, formAction] = useFormState(fetchQuizDetails, null);

  return (
    <>
      <form action={formAction}>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="sm:col-span-2">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-opacity-50 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
              placeholder="Title of the quiz"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="dark:bg-opacity-50 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
              placeholder="Description of the quiz"
            ></textarea>
          </div>
          <div>
          <div className="sm:col-span-2 mb-6">
            <label
              htmlFor="time"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Time limit
            </label>
            <select
              id="time"
              name="time"
              className="bg-gray-50 border dark:bg-opacity-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
              value={time}
              onChange={timeChangeHandler}
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
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Visibility
              </label>
              <select
                id="visibility"
                name="visibility"
                className="bg-gray-50 border dark:bg-opacity-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
                value={visibility}
                onChange={visibilityChangeHandler}
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
                  className="block mb-2 mt-6 dark:bg-opacity-50 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  className="bg-gray-50 border dark:bg-opacity-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
                  placeholder="Password to access the quiz"
                  required
                />
              </div>
            )}
          </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-purple-700 rounded-lg focus:ring-4 focus:ring-purple-200 dark:focus:ring-transparent hover:bg-purple-800"
          >
            Create <PenIcon />
          </button>
          <button
            type="button"
            className="text-purple-700 mx-2 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-800 dark:hover:border-transparent dark:focus:ring-transparent"
          >
            Cancel
          </button>
      </form>
    </>
  );
}
