import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Image from "next/image";
import User from "@/models/user";
import connectMongoDB from "@/lib/mongodb";
import { formatDate } from "@/lib/formatDate";

interface Params {
  params: {
    userId: string;
  };
}

export default async function Profile({ params }: Params) {
  const { userId } = params;

  await connectMongoDB();
  const { username, email, typeAccount, createdAt } = await User.findById({
    _id: userId,
  });

  // @ts-ignore
  const session = await getServerSession(options);
  // @ts-ignore
  const role = session?.user?.role;

  let profilePicture = "/canute-inversed.png";
  if (email === "abyan@abydyl.net" && typeAccount === "github") {
    profilePicture = "/kinderheim.png"
  }

  return (
    <section className="bg-center bg-no-repeat bg-about-page bg-cover h-screen overflow-y-auto">
      <div className="py-24 px-4 mx-auto max-w-screen-xl lg:py-28">
        <div className="border-gray-500  bg-gray-800 bg-opacity-35 border rounded-lg p-8 md:p-12 mb-8">
          <Image
            className="rounded-full mb-6"
            src={profilePicture}
            alt="profile-picture"
            width={150}
            height={150}
          />
          <h1 className="text-gray-900 dark:text-white text-4xl font-extrabold mb-2">
            {username}{" "}
            {email === "abyan@abydyl.net" && typeAccount === "github" ? (
              <mark className="px-2 text-white bg-gradient-to-r to-pink-500 from-purple-500 rounded-xl">
                Admin
              </mark>
            ) : (
              ""
            )}
          </h1>
          <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">
            {formatDate(createdAt)}
          </p>
          <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <h2 className="text-gray-900 dark:text-white text-xl font-semibold mb-2">{username}'s Quizzes</h2>
        </div>
      </div>
    </section>
  );
}
