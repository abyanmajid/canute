"use client"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <main className="relative overflow-hidden">{children}</main>
      <footer className=" fixed bottom-0 right-0 z-20 w-full flex  p-6 justify-end mr-8 mb-2">
        <span className="text-2xl px-2 justify-end text-white bg-purple-600 rounded-xl">
          01:00:00
        </span>
      </footer>
    </section>
  );
}
