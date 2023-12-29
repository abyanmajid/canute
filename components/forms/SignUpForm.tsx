"use client";

import { useFormState } from "react-dom";
import { useState } from "react";
import { createUser } from "@/lib/actions";
import { redirect } from "next/navigation";
import { validUsername } from "@/lib/usernameChecker";
import User from "@/models/user";
import { verificationErrors } from "@/lib/constants";
import { isUsernameTaken, isEmailTaken } from "@/lib/queryUnique";
import { isProfane } from "@/lib/profanityChecker";

export default function SignUpForm() {
  async function handleRegistration(prevState: any, formData: FormData) {
    const username = (await formData.get("username")) as string;
    const email = (await formData.get("email")) as string;
    const password = (await formData.get("password")) as string;
    const typeAccount = "credential";
    const banned = false;

    const usernameTaken = await isUsernameTaken(username);
    const emailTaken = await isEmailTaken(email, typeAccount);
    const profaneUsername = await isProfane(username);
    console.log(profaneUsername)

    if (username.length > 32) {
      setError("Your username must be 32 characters or less!");
    } else if (validUsername(username) === false) {
      setError("Your username may only contain letters and numbers!");
    } else if (usernameTaken) {
      setError("Username has been taken!");
    } else if (emailTaken) {
      setError("Email has been taken!");
    } else if (profaneUsername) {
      setError("Your username is inappropriate!");
    } else {
      setError("")
      await console.log(username, email, password, typeAccount, banned);
      await createUser(
        username,
        email.toLowerCase(),
        password,
        typeAccount,
        banned
      );
      redirect("/");
    }
  }

  const [state, formAction] = useFormState(handleRegistration, null);
  const [error, setError] = useState("");
  return (
    <form className="max-w-sm mx-auto" action={formAction}>
      <p
        id="helper-text-explanation"
        className="text-center text-sm text-gray-300 dark:text-gray-300 mb-4"
      >
        Already have an account?{" "}
        <a
          href="/api/auth/signin"
          className="font-medium text-purple-600 hover:underline dark:text-purple-500"
        >
          Sign In
        </a>{" "}
        instead.
      </p>
      <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      {verificationErrors.includes(error) ? (
        <p className="text-white text-sm mb-6 text-center">
          <span className="px-2 py-1 text-white bg-red-600 rounded">
            {error}
          </span>
        </p>
      ) : (
        ""
      )}
      <div className="mb-5">
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-opacity-50 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
          placeholder="Enter your username here..."
          required
        />
        <p
          id="helper-text-explanation"
          className="mt-2 text-sm text-gray-500 dark:text-gray-400"
        >
          Usernames must not exceed 32 characters, contain spaces, and any
          character besides letters of the alphabet and numbers.
        </p>
      </div>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-opacity-50 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
          placeholder="Enter your email here..."
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password here..."
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-opacity-50 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
          required
        />
      </div>

      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            name="terms"
            value=""
            className="w-4 h-4 border purple-accent border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-purple-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-purple-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            required
          />
        </div>

        <label
          htmlFor="terms"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          I agree with the{" "}
          <a
            href="/terms"
            className="text-purple-600 hover:underline dark:text-purple-500"
            target="_blank"
          >
            terms and conditions
          </a>
        </label>
      </div>
      <button
        type="submit"
        className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
      >
        Sign Up
      </button>
    </form>
  );
}
