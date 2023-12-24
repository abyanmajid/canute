import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import User from "@/models/user";
import connectMongoDB from "@/lib/mongodb";
import MyQuizzesBtn from "../buttons/MyQuizzesBtn";
import { redirect } from "next/navigation";
import ProfilePictureBtn from "../buttons/ProfilePictureBtn";

export default async function BackgroundlessNavbar() {
  // @ts-ignore
  const session = await getServerSession(options);
  // @ts-ignore
  const role = session?.user?.role;

  let profilePicture = "/canute-inversed.png";
  if (role === "admin") {
    profilePicture = "/kinderheim.png";
  }

  async function sendProfilePage() {
    "use server";
    await connectMongoDB();
    let typeAccount = "google";
    if (role === "GitHub User" || role === "admin") {
      typeAccount = "github";
    }
    const user = await User.findOne({
      email: session?.user?.email,
      typeAccount: typeAccount,
    });
    redirect(`/user/${user._id}`);
  }

  return (
    <>
      <nav className="fixed w-full z-20 top-0 start-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/logo-textless.svg"
              className="h-8"
              alt="Flowbite Logo"
              height={32}
              width={32}
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Canute
            </span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {session ? (
              <Link href="/api/auth/signout?callbackUrl=/">
                <button
                  type="button"
                  className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                >
                  Sign Out
                </button>
              </Link>
            ) : (
              <Link href="/api/auth/signin">
                <button
                  type="button"
                  className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                >
                  Sign In
                </button>
              </Link>
            )}
            <ProfilePictureBtn
              session={session}
              profilePicture={profilePicture}
              sendProfilePage={sendProfilePage}
            />

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-900 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between content-center hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0 md:dark:hover:text-purple-500 dark:text-white dark:hover:text-white "
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <MyQuizzesBtn
                session={session}
                sendProfilePage={sendProfilePage}
              />
              <li>
                <Link
                  href="/about"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0 md:dark:hover:text-purple-500 dark:text-white dark:hover:text-white "
                >
                  About
                </Link>
              </li>
              {role === "admin" ? (
                <li>
                  <Link
                    href="/admin"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0 md:dark:hover:text-purple-500 dark:text-white dark:hover:text-white "
                  >
                    Admin
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
