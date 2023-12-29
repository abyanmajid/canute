import type { Metadata } from "next";
import "./globals.css";

import Footer from "@/components/partials/Footer";
import BackgroundlessNavbar from "@/components/partials/Navbar";
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Canute",
  description: "Description",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // @ts-ignore
  const session = await getServerSession(options);
  // @ts-ignore
  const role = session?.user?.role;
  return (
    <html lang="en">
      <body className="bg-black">
        <BackgroundlessNavbar session={session} role={role} />
        <main className="relative overflow-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
