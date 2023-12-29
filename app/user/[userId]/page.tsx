import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Image from "next/image";
import User from "@/models/user";
import connectMongoDB from "@/lib/mongodb";
import { formatDate } from "@/lib/formatDate";
import Link from "next/link";
import OpenBookIcon from "@/components/icons/OpenBookIcon";
import Quiz from "@/models/quiz";
import { capitalizeFirstLetter } from "@/lib/capitalizeFirstLetter";
import { formatTimeLong } from "@/lib/formatTime";
import EyeIcon from "@/components/icons/EyeIcon";
import ClockIcon from "@/components/icons/ClockIcon";
import QuestionMarkIcon from "@/components/icons/QuestionMarkIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import CreatorButtons from "@/components/buttons/CreatorButtons"
import {redirect} from "next/navigation"

interface Params {
  params: {
    userId: string;
  };
}

export default async function Profile({ params }: Params) {
  const { userId } = params;

  await connectMongoDB();
  const { username, email, typeAccount, banned, createdAt, quizzes } =
    await User.findById({
      _id: userId,
    });

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

    if (visitorUser.banned) {
      redirect("/banned")
    }

    // @ts-ignore
    visitorId = visitorUser._id.toString();
  }

  let profilePicture = "/canute-inversed.png";
  if (email === "abyan@abydyl.net" && typeAccount === "github") {
    profilePicture = "/kinderheim.png";
  }
  const quizArray = [];
  for (let quizId of quizzes) {
    const quiz = await Quiz.findById({ _id: quizId });
    quizArray.push(quiz);
  }
  quizArray.reverse();

  return (
    <section className="bg-center bg-no-repeat bg-user-page bg-cover h-screen overflow-y-auto">
      <div className="py-24 px-4 mx-auto max-w-screen-xl lg:py-28">
        <div className="border-gray-500  bg-gray-800 bg-opacity-35 border rounded-lg p-8 md:p-12 mb-8">
          <Image
            className="rounded-full mb-6"
            src={profilePicture}
            alt="profile-picture"
            width={150}
            height={150}
          />
          <h1 className="text-white text-4xl font-extrabold mb-2">
            {username}{" "}
            {email === "abyan@abydyl.net" && typeAccount === "github" ? (
              <mark className="px-2 text-white bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl mr-2">
                Developer
              </mark>
            ) : (
              ""
            )}
            {banned ? (
              <mark className="px-2 text-white bg-red-500 rounded-xl mr-2">
                Banned
              </mark>
            ) : (
              ""
            )}
          </h1>
          <p className="text-lg font-normal text-gray-400 mb-6">
            {formatDate(createdAt)}
          </p>
          {visitorId === userId ? (
            <Link
              href="/quiz/create"
              className="mr-2 inline-flex justify-center items-center py-2.5 px-3 text-base font-medium text-white bg-gradient-to-r to-pink-500 from-purple-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-transparent rounded-lg text-center"
            >
              <PlusIcon />
              Create Quiz
            </Link>
          ) : (
            ""
          )}
          <hr className="h-px my-6 border-0 bg-gray-700"></hr>
          <div className="mb-6">
            <h2 className="text-white text-xl font-semibold mb-2">
              {username}&apos;s Quizzes
            </h2>
            {quizArray.length === 0 ? (
              <p className="text-lg font-normal text-gray-400 mb-6">
                {username} has not created any quizzes.
              </p>
            ) : (
              ""
            )}
          </div>
          {quizArray.filter(quiz => quiz !== null).map((quiz, index) => {
            const shouldRenderQuiz =
              quiz.visibility !== "myself" || visitorId === quiz.creatorId;

            if (!shouldRenderQuiz) {
              return null;
            }

            return (
              <div
                key={index}
                className="border-gray-500 bg-gray-800 bg-opacity-35 border rounded-lg p-8 mb-8"
              >
                <h2 className="text-white text-xl font-semibold mb-2">
                  {quiz.title}{" "}
                  <mark className="px-2 text-white bg-gradient-to-r to-pink-500 from-purple-500 rounded-xl">
                    {quiz.code}
                  </mark>{" "}
                </h2>
                <p className="text-lg font-normal text-gray-400 mb-6">
                  {quiz.description}
                </p>
                <p className="text-sm font-normal text-gray-400 mb-6">
                  <span className="font-semibold py-1 px-2 text-white bg-yellow-700 rounded-lg mr-2 inline-flex items-center">
                    <EyeIcon />
                    {capitalizeFirstLetter(quiz.visibility)}
                  </span>
                  <span className="font-semibold bg-green-700 px-2 text-white py-1 rounded-lg mr-2 inline-flex items-center">
                    <ClockIcon />
                    {formatTimeLong(quiz.time)}
                  </span>
                  <span className="font-semibold bg-cyan-700 px-2 text-white py-1 rounded-lg mr-2 inline-flex items-center">
                    <QuestionMarkIcon />
                    {quiz.questions.length} questions
                  </span>
                </p>
                <div className="flex items-center">
                  <Link
                    href={`/quiz/${quiz._id}`}
                    className="mr-2 inline-flex justify-center items-center py-2.5 px-3 text-base font-medium text-center text-white rounded-lg bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-900"
                  >
                    <OpenBookIcon />
                    Play
                  </Link>
                  <CreatorButtons quizId={quiz._id.toString()} visitorId={visitorId} creatorId={quiz.creatorId.toString()}/>
                </div>
              </div>
            );
          })}
          <div className="fixed bottom-0 right-0 z-20 w-full flex p-6 justify-end mr-8 mb-2"></div>
        </div>
      </div>
    </section>
  );
}
