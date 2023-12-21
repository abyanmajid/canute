import CreateQuizForm from "@/components/forms/CreateQuizForm";

export default function CreateQuiz() {
  return (
    <>
      <section className="bg-center bg-no-repeat bg-create-page bg-cover h-screen">
        <div className="py-12 px-4 mx-auto max-w-2xl lg:py-32">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Create a New Quiz
          </h2>
          <CreateQuizForm />
        </div>
      </section>
    </>
  );
}
