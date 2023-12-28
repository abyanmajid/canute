import Link from "next/link";
import { Params } from "@/lib/constants";
import { getQuiz } from "@/lib/actions";
import User from "@/models/user";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import QuizEntryForm from "@/components/forms/QuizEntryForm";
import { formatSecondsToTimeLong, formatTimeLong } from "@/lib/formatTime";
import { sortedLeaderboard } from "@/lib/sortedLeaderboard";

export default async function QuizEntryPoint({ params }: Params) {
  const quiz = await getQuiz(params.quizId);
  const quizJSON = JSON.stringify(quiz);
  const user = await User.findById({ _id: quiz.creatorId });

  // @ts-ignore
  const session = await getServerSession(options);
  // @ts-ignore
  let visitorId: null | string = null;
  if (session) {
    // @ts-ignore
    const visitorRole = session?.user?.role;
    const visitorEmail = session?.user?.email;
    let visitorTypeAccount = "google";
    if (visitorRole === "GitHub user" || visitorRole === "admin") {
      visitorTypeAccount = "github";
    }
    const visitorUser = await User.findOne({
      email: visitorEmail,
      typeAccount: visitorTypeAccount,
    });
    // @ts-ignore
    visitorId = visitorUser._id.toString();
  }

  if (quiz.visibility === "myself") {
    if (visitorId !== quiz.creatorId) {
      notFound();
    }
  }

  const leaderboard = sortedLeaderboard(quiz.leaderboard);

  console.log(leaderboard);

  return (
    <section className="bg-center bg-no-repeat bg-about-page bg-cover h-screen overflow-y-auto">
      <div className="py-24 px-4 mx-auto max-w-screen-xl">
        <div className="border-gray-500  bg-gray-800 bg-opacity-35 border rounded-lg p-8 md:p-12 mb-8">
          <Link href={`/user/${user._id}`}>
            <span className="bg-purple-100 text-purple-800 text-sm font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-gray-700 dark:text-purple-400 mb-2">
              <svg
                className="w-2.5 h-2.5 me-1.5 mb-1.5 mt-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 14 18"
              >
                <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
              </svg>
              {user.username}
            </span>
          </Link>
          <h1 className="text-gray-900 dark:text-white text-4xl font-extrabold mb-2">
            {quiz.title}{" "}
            <mark className="px-2 text-white bg-gradient-to-r to-pink-500 from-purple-500 rounded-xl text-lg">
              {quiz.code}
            </mark>{" "}
          </h1>
          <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">
            {quiz.description}
          </p>
          <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-2">
            <span className="font-semibold text-white">Time limit:</span>{" "}
            {formatTimeLong(quiz.time)}
          </p>
          <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-2">
            <span className="font-semibold text-white">Questions:</span>{" "}
            {quiz.questions.length}
          </p>
          <QuizEntryForm quizJSON={quizJSON} visitorId={visitorId} />

          <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          <div className="px-4 mx-auto max-w-screen-xl">
            <div className="border-gray-500  bg-gray-800 bg-opacity-35 border rounded-lg p-8 md:p-12 mb-8 text-center">
              <h1 className="text-gray-900 dark:text-white text-4xl font-extrabold mb-2">
                Leaderboard
              </h1>
              <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs dark:bg-opacity-70 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Player
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Medal
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Score
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Correct Answers
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Time taken
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((item: any, index: any) => {
                      if (item.showOnLeaderboard) {
                        return (
                          <tr
                            key={index}
                            className={`odd:bg-white odd:dark:bg-opacity-50 even:dark:bg-opacity-50 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700`}
                          >
                            <th
                              scope="row"
                              className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {item.loggedIn ? (
                                <Link
                                  href={`/user/${item.user}`}
                                  className=" hover:text-purple-500"
                                >
                                  {item.registeredUsername}
                                </Link>
                              ) : (
                                <span className="text-gray-400">
                                  {item.user}
                                </span>
                              )}
                              &nbsp;
                              {item.loggedIn ? (
                                ""
                              ) : (
                                <mark className="px-1 text-white bg-gray-500 rounded">
                                  Guest
                                </mark>
                              )}
                              {item.user === "65893d4130e063bd448fa980" ? (
                                <mark className="text-white px-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded">
                                  Developer
                                </mark>
                              ) : (
                                ""
                              )}
                            </th>
                            <td className="px-6 py-3">
                              {index === 0 ? (
                                <mark className="px-1 text-white bg-yellow-600 rounded">
                                  Gold
                                </mark>
                              ) : (
                                ""
                              )}
                              {index === 1 ? (
                                <mark className="px-1 text-white bg-gray-500 rounded">
                                  Silver
                                </mark>
                              ) : (
                                ""
                              )}
                              {index === 2 ? (
                                <mark className="px-1 text-white bg-orange-800 rounded">
                                  Bronze
                                </mark>
                              ) : (
                                ""
                              )}
                            </td>
                            <td className="px-6 py-3">
                              {Math.round(
                                (item.numOfCorrectAnswers /
                                  item.numOfGradedQuestions) *
                                  100
                              )}
                              %
                            </td>
                            <td className="px-6 py-3">
                              {item.numOfCorrectAnswers}/
                              {item.numOfGradedQuestions}
                            </td>
                            <td className="px-6 py-3">
                              {formatSecondsToTimeLong(item.timeTakenInSeconds)}
                            </td>
                          </tr>
                        );
                      }
                      return null; // If showOnLeaderboard is false, don't render the row
                    })}
                  </tbody>
                </table>
              </div>
              ;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
