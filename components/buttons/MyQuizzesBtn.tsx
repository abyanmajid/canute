"use client";

export default function MyQuizzesBtn({
  session,
  sendProfilePage,
}: {
  session: any;
  sendProfilePage: any;
}) {
  return (
    <div>
      {session ? (
        <li>
          <button
            onClick={() => {
              sendProfilePage()}}
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0 md:dark:hover:text-purple-500 dark:text-white dark:hover:text-white "
          >
            My Quizzes
          </button>
        </li>
      ) : (
        ""
      )}
    </div>
  );
}
