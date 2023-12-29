import BanForm from "@/components/forms/BanForm";
import UnbanForm from "@/components/forms/UnbanForm";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import User from "@/models/user";
import { notFound, redirect } from "next/navigation";

export default async function Admin() {
  // @ts-ignore
  const session = await getServerSession(options);
  // @ts-ignore
  let visitorId: null | string = null;
  if (session) {
    // @ts-ignore
    const visitorRole = session?.user?.role;
    const visitorEmail = session?.user?.email;
    let visitorTypeAccount = "google";
    if (visitorRole === "GitHub user" || visitorRole === "admin") {
      visitorTypeAccount = "github";
    }
    const visitorUser = await User.findOne({
      email: visitorEmail,
      typeAccount: visitorTypeAccount,
    });

    if (visitorUser.banned) {
      redirect("/banned");
    }

    // @ts-ignore
    visitorId = visitorUser._id.toString();
  }
  if (visitorId !== "65893d4130e063bd448fa980") {
    notFound();
  }

  return (
    <>
      <section className="bg-center bg-no-repeat bg-about-page bg-cover h-screen">
        <div id="about" className="px-4 mx-auto max-w-screen-xl py-32">
          <div className="border-gray-500  bg-gray-800 bg-opacity-35 border rounded-lg p-8 md:p-12 mb-8">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white">
              Admin Panel{" "}
            </h1>
            <hr className="h-px my-6 border-0 bg-gray-700"></hr>
            <div className="mb-4">
              <BanForm />
            </div>
            <div className="mb-4">
              <UnbanForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
