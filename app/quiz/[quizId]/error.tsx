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
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white">
            Quiz <span className="text-red-400 underline">not found!</span>
          </h1>
          <p className="mb-6 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400">
            <span className="font-semibold underline text-white decoration-purple-500">
              Please make sure you entered a valid code!
            </span>{" "}
            If youre certain that your code is correct, and are sure that this is
            an error on our side, please contact administrator at{" "}
            <span className="text-purple-400">abyan@abydyl.net</span>
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4focus:ring-purple-900"
          >
            Try Again
          </Link>
        </div>
      </section>
    </>
  );
}
