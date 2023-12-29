import type { Metadata } from "next";
import "./globals.css";

import Footer from "@/components/partials/Footer";
import BackgroundlessNavbar from "@/components/partials/Navbar";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Canute",
  description: "Description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className="bg-black">
        <BackgroundlessNavbar />
        <main className="relative overflow-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
