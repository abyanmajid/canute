export const formatTime = (seconds: number): string => {
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
