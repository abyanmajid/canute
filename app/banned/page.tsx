"use client";

import Link from "next/link";

export default function Banned() {
  return (
    <>
      <section className="bg-center bg-no-repeat bg-about-page bg-cover h-screen">
        <div
          id="about"
          className="px-4 mx-auto max-w-screen-xl text-center py-32 lg:py-64"
        >
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            This account has been <span className="text-red-400 underline">banned!</span>
          </h1>
          <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            If you are certain this is a mistake, please submit a ban appeal to
            {" "}<span className="text-purple-400">abyan@abydyl.net</span>
          </p>
        </div>
      </section>
    </>
  );
}
