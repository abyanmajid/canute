export function formatDate(dateString: string) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();

  return `Joined at ${month} ${day}, ${year}`;
}
