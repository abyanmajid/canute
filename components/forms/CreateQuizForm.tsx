"use client";

import PenIcon from "@/components/icons/PenIcon";
import { useState } from "react";

export default function CreateQuizForm() {
  const [visibility, setVisibility] = useState("everyone");

  function visibilityChangeHandler(event: any) {
    const newVisibility = event.target.value;
    setVisibility(newVisibility);
  }

  return (
    <>
      <form action="#">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="sm:col-span-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
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
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
              placeholder="Description of the quiz"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="visibility"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Visibility
            </label>
            <select
              id="visibility"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
              value={visibility}
              onChange={visibilityChangeHandler}
            >
              <option value="everyone">Everyone</option>
              <option value="restricted">Restricted</option>
              <option value="myself-only">Myself</option>
            </select>

            {visibility === "restricted" && (
              <div className="sm:col-span-2">
                <label
                  htmlFor="password"
                  className="block mb-2 mt-6 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
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
