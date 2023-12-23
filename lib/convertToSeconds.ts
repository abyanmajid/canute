export function convertToSeconds(timeString: string) {
    // Regular expression to match the pattern "<hours>h <minutes>m"
    const timePattern = /(\d+)h (\d+)m/;
    const match = timeString.match(timePattern);
  
    if (match) {
      const hours = parseInt(match[1], 10); // Convert hours string to integer
      const minutes = parseInt(match[2], 10); // Convert minutes string to integer
  
      // Calculate total seconds
      const totalSeconds = (hours * 60 * 60) + (minutes * 60);
      return totalSeconds;
    } else {
      throw new Error("Invalid time format");
    }
  }