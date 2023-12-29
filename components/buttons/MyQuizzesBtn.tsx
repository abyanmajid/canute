"use client";

export default function MyQuizzesBtn({
  session,
  role,
  sendProfilePage,
}: {
  session: any;
  role: string;
  sendProfilePage: any;
}) {
  return (
    <>
    <div>
      {session ? (
        <li>
          <button
            onClick={() => {
              sendProfilePage(role, session);
            }}
            className="block py-2 px-3 w-full text-left rounded hover:bg-purple-600 md:hover:bg-transparent md:p-0 md:hover:text-purple-500 text-white hover:text-white "
          >
            My Quizzes
          </button>
        </li>
      ) : (
        ""
      )}
      </div>
    </>
  );
}
