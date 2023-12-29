"use client";

import { useFormState } from "react-dom";
import { banUser } from "@/lib/actions";
import { useState } from "react";

export default function BanForm() {
  const [bannedUser, setBannedUser] = useState("");

  async function fetchUserId(prevState: any, formData: FormData) {
    const userId = (await formData.get("userId")) as string;
    await banUser(userId);
    await setBannedUser(userId);
  }

  const [state, formAction] = useFormState(fetchUserId, null);
  return (
    <form action={formAction}>
      <div className="grid gap-6 mb-2 md:grid-cols-2">
        <div>
          <label
            htmlFor="userId"
            className="block mb-2 text-sm font-medium text-white"
          >
            Ban User by ID
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            className="border bg-opacity-50 text-sm rounded-lg block w-full p-2.5 bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter User's ID here..."
            required
          />
        </div>
      </div>
      {bannedUser !== "" ? (
        <p className="mb-4 mt-1 text-sm text-green-500" id="file_input_help">
          Succcessfully banned User #{bannedUser}
        </p>
      ) : (
        ""
      )}

      <button
        type="submit"
        className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-purple-600 hover:bg-purple-700 focus:ring-purple-800"
      >
        Ban
      </button>
    </form>
    
  );
}
