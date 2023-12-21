import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function BackgroundlessNavbar() {
  return (
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
          <button
            type="button"
            className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
          >
            Log In
          </button>

          <button
            type="button"
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            Sign Up
          </button>

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
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-white bg-purple-700 rounded md:bg-transparent md:text-purple-700 md:p-0 md:dark:text-purple-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0 md:dark:hover:text-purple-500 dark:text-white dark:hover:text-white "
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    // <nav classNameName="flexBetween max-container padding-container relative z-30 py-5">
    //   <Link href="/">
    //     <Image src="/canute-logo.png" alt="logo" width={125} height={43} />
    //   </Link>
    //   <ul classNameName="hidden h-full gap-12 lg:flex">
    //     {NAV_LINKS.map((link) => (
    //       <Link
    //         href={link.href}
    //         key={link.key}
    //         classNameName="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
    //       >
    //         {link.label}
    //       </Link>
    //     ))}
    //   </ul>
    //   <div classNameName="lg:flexCenter hidden">
    //     <Button
    //       type="button"
    //       title="Log In"
    //       icon="/user.svg"
    //       variant="btn_dark_purple"
    //     />
    //   </div>
    //   <Image src="menu.svg" alt="menu" width={32} height={32} classNameName="inline-block cursor-pointer lg:hidden"/>
    // </nav>
  );
}
