"use client";

import { useFormState } from "react-dom";
import { unbanUser } from "@/lib/actions";
import { useState } from "react";

export default function UnbanForm() {
  const [unbannedUser, setUnbannedUser] = useState("");

  async function fetchUserId(prevState: any, formData: FormData) {
    const userId = (await formData.get("userId")) as string;
    await unbanUser(userId);
    await setUnbannedUser(userId);
  }

  const [state, formAction] = useFormState(fetchUserId, null);
  return (
    <form action={formAction}>
      <div className="grid gap-6 mb-2 md:grid-cols-2">
        <div>
          <label
            htmlFor="userId"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Unban User by ID
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            className="bg-gray-50 border dark:bg-opacity-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
            placeholder="Enter User's ID here..."
            required
          />
        </div>
      </div>
      {unbannedUser !== "" ? (
        <p className="mb-4 mt-1 text-sm text-green-500" id="file_input_help">
          Succcessfully unbanned User #{unbannedUser}
        </p>
      ) : (
        ""
      )}

      <button
        type="submit"
        className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
      >
        Unban
      </button>
    </form>
    
  );
}
