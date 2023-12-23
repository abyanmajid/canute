"use client"

import { useState, useEffect } from "react";

const formatTime = (seconds: number): string => {
  // Debugging log
  console.log("Seconds:", seconds);

  // Ensure that seconds is a valid number
  if (typeof seconds !== "number" || isNaN(seconds) || seconds < 0) {
    return "00:00:00";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;

  const hoursPadded = String(hours).padStart(2, "0");
  const minutesPadded = String(minutes).padStart(2, "0");
  const secondsPadded = String(sec).padStart(2, "0");

  return `${hoursPadded}:${minutesPadded}:${secondsPadded}`;
};

export default function Timer({ timeInSeconds }: { timeInSeconds: any }) {
  const [time, setTime] = useState<number>(timeInSeconds);

  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [time]);

  return (
    <div className="fixed bottom-0 right-0 z-20 w-full flex p-6 justify-end mr-8 mb-2">
      <span className="text-2xl px-2 justify-end text-white bg-purple-600 rounded-xl">
        {formatTime(time)}
      </span>
    </div>
  );
}
