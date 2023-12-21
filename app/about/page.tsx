export default function About() {
  return (
    <>
      <section className="bg-center bg-no-repeat bg-about-page bg-cover h-screen">
        <div id="about" className="px-4 mx-auto max-w-screen-xl py-32 lg:py-48">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            About{" "}
            <mark className="px-2 text-white bg-gradient-to-r to-pink-500 from-purple-500 rounded-xl">
              Canute
            </mark>{" "}
          </h1>
          <div className="grid grid-cols-1 md:gap-6 md:grid-cols-2">
            <div>
              <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-pink-500 from-purple-500">
                  Canute
                </span>{" "}
                is a{" "}
                <span className="font-semibold text-gray-900 underline dark:text-white decoration-purple-500">
                  Quiz-making web application
                </span>{" "}
                built by{" "}
                <a
                  href="http://www.github.com/abyanmajid"
                  className="text-purple-600 underline dark:text-purple-400 hover:no-underline hover:text-purple-300 font-semibold"
                >
                  Abyan Majid
                </a>{" "}
                in 2023, during the semester break in his Freshman Year at the
                University of Sydney.
              </p>
              <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Abyan built it in order to practice{" "}
                <span className="font-semibold text-gray-900 underline dark:text-white decoration-purple-500">
                  full-stack development
                </span>
                , and along the way, create his own software to assist himself,
                and others, in{" "}
                <span className="font-semibold text-gray-900 underline dark:text-white decoration-purple-500">
                  actively recalling
                </span>{" "}
                their study materials.
              </p>
            </div>
            <blockquote className="mb-3">
              <p className="italic text-lg text-white lg:text-2xl dark:text-white font-semibold">
                "I hear I forget. I see and I remember. I do and I understand."
              </p>
              <figcaption className="flex  mt-6 space-x-3 rtl:space-x-reverse">
                <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
                  <cite className="pe-3 font-medium text-gray-900 dark:text-white">
                    Confucius
                  </cite>
                  <cite className="ps-3 text-sm text-gray-500 dark:text-gray-400">
                    Philosopher
                  </cite>
                </div>
              </figcaption>
              <p className="italic text-lg text-white lg:text-2xl dark:text-white font-semibold mt-6">
                "You don't learn to walk by following the rules. You learn by
                doing, and by falling over."
              </p>
              <figcaption className="flex  mt-6 space-x-3 rtl:space-x-reverse">
                <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
                  <cite className="pe-3 font-medium text-gray-900 dark:text-white">
                    Richard Branson
                  </cite>
                  <cite className="ps-3 text-sm text-gray-500 dark:text-gray-400">
                    Founder of Virgin Group and Commercial Astronaut
                  </cite>
                </div>
              </figcaption>
            </blockquote>
          </div>
        </div>
      </section>
    </>
  );
}
