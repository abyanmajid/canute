export default function About() {
  return (
    <>
      <section className="bg-center bg-no-repeat bg-about-page bg-cover h-screen">
        <div id="about" className="px-4 mx-auto max-w-screen-xl py-32">
          <div className="border-gray-500  bg-gray-800 bg-opacity-35 border rounded-lg p-8 md:p-12 mb-8">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white">
              About{" "}
              <mark className="px-2 text-white bg-gradient-to-r to-pink-500 from-purple-500 rounded-xl">
                Canute
              </mark>{" "}
            </h1>
            <div className="grid grid-cols-1 md:gap-6 md:grid-cols-2">
              <div>
                <p className="text-lg font-normal lg:text-xl text-gray-400">
                  <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-pink-500 from-purple-500">
                    Canute
                  </span>{" "}
                  is a{" "}
                  <span className="font-semibold underline text-white decoration-purple-500">
                    Quiz-making web application
                  </span>{" "}
                  built by{" "}
                  <a
                    href="http://www.github.com/abyanmajid"
                    className="underline text-purple-400 hover:no-underline hover:text-purple-300 font-semibold"
                  >
                    Abyan Majid
                  </a>{" "}
                  in 2023, during the semester break in his Freshman Year at the
                  University of Sydney.
                </p>
                <hr className="h-px my-6 border-0 bg-gray-700"></hr>
                <p className="text-lg font-normal lg:text-xl text-gray-400">
                  Abyan built it in order to practice{" "}
                  <span className="font-semibold underline text-white decoration-purple-500">
                    full-stack development
                  </span>
                  , and along the way, create his own software to assist
                  himself, and others, in{" "}
                  <span className="font-semibold underline text-white decoration-purple-500">
                    actively recalling
                  </span>{" "}
                  their study materials.
                </p>
              </div>
              <blockquote className="mb-3">
                <p className="italic text-lg lg:text-2xl text-white font-semibold">
                  &quot;I hear I forget. I see and I remember. I do and I
                  understand.&quot;
                </p>
                <figcaption className="flex  mt-6 space-x-3 rtl:space-x-reverse">
                  <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-700">
                    <cite className="pe-3 font-medium text-white">
                      Confucius
                    </cite>
                    <cite className="ps-3 text-sm text-gray-400">
                      Philosopher
                    </cite>
                  </div>
                </figcaption>
                <p className="italic text-lg lg:text-2xl text-white font-semibold mt-6">
                  &quot;You dont learn to walk by following the rules. You learn
                  by doing, and by falling over.&quot;
                </p>
                <figcaption className="flex  mt-6 space-x-3 rtl:space-x-reverse">
                  <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-700">
                    <cite className="pe-3 font-medium text-white">
                      Richard Branson
                    </cite>
                    <cite className="ps-3 text-sm text-gray-400">
                      Founder of Virgin Group and Commercial Astronaut
                    </cite>
                  </div>
                </figcaption>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
