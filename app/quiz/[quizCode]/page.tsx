import OpenBookIcon from "@/components/icons/OpenBookIcon";
import Params from "@/lib/constants";

export default function QuizSlug({ params }: Params) {
  return (
    <section className="bg-center bg-no-repeat bg-about-page bg-cover h-screen">
      <div className="py-24 px-4 mx-auto max-w-screen-xl lg:py-48">
        <div className="border-gray-500  bg-gray-800 bg-opacity-35 border rounded-lg p-8 md:p-12 mb-8">
          <span className="bg-purple-100 text-purple-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-purple-400 mb-2">
            <svg
              className="w-2.5 h-2.5 me-1.5 mb-1.5 mt-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 14 18"
            >
              <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
            </svg>
            Kinderheim511
          </span>
          <h1 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-extrabold mb-2">
            Mathematics{" "}
            <mark className="px-2 text-white bg-gradient-to-r to-pink-500 from-purple-500 rounded-xl text-xl">
              #{params.quizCode}
            </mark>{" "}
          </h1>
          <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">
            Static websites are now used to bootstrap lots of websites and are
            becoming the basis for a variety of tools that even influence both
            web designers and developers.
          </p>
          <a
            href="#"
            className="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-900"
          >
            <OpenBookIcon />
            Play
          </a>
        </div>
      </div>
    </section>
  );
}
