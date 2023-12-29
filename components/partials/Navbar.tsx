"use client";

import Link from "next/link";
import Image from "next/image";
import MyQuizzesBtn from "../buttons/MyQuizzesBtn";
import ProfilePictureBtn from "../buttons/ProfilePictureBtn";
import { sendProfilePage } from "@/lib/actions";
import { useState } from "react";

export default function BackgroundlessNavbar({
  session,
  role,
}: {
  session: any;
  role: string;
}) {
  let profilePicture = "/canute-inversed.png";
  if (role === "admin") {
    profilePicture = "/kinderheim.png";
  }

  const [openMenu, setOpenMenu] = useState(false)

  function handleMenuToggle() {
    setOpenMenu(!openMenu)
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
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Canute
            </span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {session ? (
              <Link href="/api/auth/signout?callbackUrl=/">
                <button
                  type="button"
                  className="focus:outline-none text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-purple-600 hover:bg-purple-700 focus:ring-purple-900"
                >
                  Sign Out
                </button>
              </Link>
            ) : (
              <Link href="/api/auth/signin">
                <button
                  type="button"
                  className="focus:outline-none text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-purple-600 hover:bg-purple-700 focus:ring-purple-900"
                >
                  Sign In
                </button>
              </Link>
            )}
            <ProfilePictureBtn
              role={role}
              session={session}
              profilePicture={profilePicture}
              sendProfilePage={sendProfilePage}
            />

            <button
              onClick={handleMenuToggle}
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden  focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-900 focus:ring-gray-600"
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between content-center ${openMenu ? "custom-sm:bg-gray-800 custom-sm:rounded-lg bg-opacity-50" : 'hidden bg-opacity-0'} w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul onClick={handleMenuToggle} className="flex flex-col p-4 md:p-0 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 rounded hover:bg-purple-600 md:hover:bg-transparent md:p-0 md:hover:text-purple-500 text-white hover:text-white "
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <MyQuizzesBtn
                session={session}
                role={role}
                sendProfilePage={sendProfilePage}
              />
              <li>
                <Link
                  href="/about"
                  className="block py-2 px-3 rounded hover:bg-purple-600 md:hover:bg-transparent md:p-0 md:hover:text-purple-500 text-white hover:text-white "
                >
                  About
                </Link>
              </li>
              {role === "admin" ? (
                <li>
                  <Link
                    href="/admin"
                    className="block py-2 px-3 rounded hover:bg-purple-600 md:hover:bg-transparent md:p-0 md:hover:text-purple-500 text-white hover:text-white "
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
