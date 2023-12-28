"use client";

import Link from "next/link";

export default function Error() {
  return (
    <>
      <section className="bg-center bg-no-repeat bg-about-page bg-cover h-screen">
        <div
          id="about"
          className="px-4 mx-auto max-w-screen-xl text-center py-32 lg:py-64"
        >
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            User <span className="text-red-400 underline">not found!</span>
          </h1>
          <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            If you&apos;re certain that this is an error on our side, please contact
            administrator at{" "}
            <span className="text-purple-400">abyan@abydyl.net</span>
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-900"
          >
            Go to Home Page
          </Link>
        </div>
      </section>
    </>
  );
}
