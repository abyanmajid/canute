import React from "react";

export default function Footer() {
  return (
    <footer className=" fixed bottom-0 left-0 z-20 w-full p-40 md:flex md:items-center md:justify-between md:p-6">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2023 Canute by <span className="text-purple-500 hover:underline hover:text-purple-400"><a href="http://www.github.com/abyanmajid">Abyan Majid</a></span>
      </span>
    </footer>
  );
}
