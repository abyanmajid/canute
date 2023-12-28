export const formatTimeShort = (seconds: number): string => {
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

export const formatTimeLong = (input: string) => {
  const hourRegex = /(\d+)h/;
  const minuteRegex = /(\d+)m/;

  const hourMatch = input.match(hourRegex);
  const minuteMatch = input.match(minuteRegex);

  let formattedString = "";

  // Add hours part only if hours are present and more than 0
  if (hourMatch && parseInt(hourMatch[1], 10) > 0) {
    const hours = parseInt(hourMatch[1], 10);
    formattedString += `${hours} hour${hours !== 1 ? "s" : ""} `;
  }

  // Add minutes part only if minutes are present
  if (minuteMatch) {
    const minutes = parseInt(minuteMatch[1], 10);
    if (formattedString.length > 0) {
      formattedString += "and ";
    }
    formattedString += `${minutes} min`;
  }

  return formattedString.trim();
};

export const formatSecondsToTimeLong = (inputSeconds: number) => {
  const hours = Math.floor(inputSeconds / 3600);
  const minutes = Math.floor((inputSeconds % 3600) / 60);
  const seconds = inputSeconds % 60;

  let formattedString = "";

  // Add hours part only if hours are present and more than 0
  if (hours > 0) {
    formattedString += `${hours}h `;
  }

  // Add minutes part only if minutes are present or if there are hours
  if (minutes > 0 || hours > 0) {
    formattedString += `${minutes}m `;
  }

  // Add seconds part only if seconds are present
  if (seconds > 0) {
    formattedString += `${seconds}s`;
  }

  return formattedString.trim();
};
