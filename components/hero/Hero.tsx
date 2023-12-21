import HeroForm from "@/components/Forms/HeroForm"

export default function Hero() {
  return (
    <section className="bg-center bg-no-repeat bg-hero bg-blend-multiply">
      <div className="px-4 mx-auto max-w-screen-xl text-center py-32 lg:py-64">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
          Start by <span className="text-purple-400 underline">testing</span> your limits.
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
          Create interactive quizzes for yourself, your students, and others
          here with Canute.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <HeroForm/>
        </div>
      </div>
    </section>
  );
}
