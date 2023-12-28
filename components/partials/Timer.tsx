"use client"

import { formatTimeShort } from "@/lib/formatTime";

export default function Timer({ time }: { time: any }) {
  return (
    <div className="fixed bottom-0 right-0 z-20 w-full flex p-6 justify-end mr-8 mb-2">
      <span className="text-2xl px-2 justify-end text-white bg-purple-600 rounded-xl">
        {formatTimeShort(time)}
      </span>
    </div>
  );
}
