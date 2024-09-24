export function reformatDateWithDay(dateString) {
  // Create a Date object in local time from the input string
  const [year, month, day] = dateString.split("/");
  const date = new Date(year, month - 1, day); // month - 1 because months are 0-indexed

  // Get day of the week and format month/day
  const options = { weekday: "long" }; // e.g., "Monday"
  const dayOfWeek = date.toLocaleDateString("en-US", options);
  const formattedDate = `${month}/${day}`;

  // Combine day of the week with formatted date
  return `${dayOfWeek} ${formattedDate}`;
}

// Helper function to format date and time to AM/PM format
export function formatDateTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

export const getRoundedStartOfMonthSixMonthsAgo = () => {
  const today = new Date();

  // Subtract 6 months from today's date
  today.setMonth(today.getMonth() - 9);

  // Set the day to the first of the month
  today.setDate(1);

  // Reset time to the start of the day (00:00:00)
  today.setHours(0, 0, 0, 0);

  // Format the date to YYYY/MM/DD
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
};

export function calculateTotalHours(entries) {
  let totalMinutes = 0;

  entries.forEach((entry) => {
    const startTime = new Date(entry.start);
    const endTime = new Date(entry.end);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = endTime - startTime;
    const minutes = differenceInMilliseconds / (1000 * 60); // Convert milliseconds to minutes

    // Add to the total minutes
    totalMinutes += minutes;
  });

  // Convert total minutes to hours
  const totalHours = totalMinutes / 60;

  // Round up to the nearest hundredth of an hour
  const roundedTotalHours = Math.ceil(totalHours * 100) / 100;

  return roundedTotalHours.toFixed(2);
}

export function isoStringToLocalDate(isoString) {
  const date = new Date(isoString);
  // Create a new Date object using the local time zone values
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  );
}

export const getDateRangeLabel = (isoDateString) => {
  const date = new Date(isoDateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" }); // e.g., 'Jan'
  const year = date.getFullYear();

  if (day <= 15) {
    return `${month} 1-15, ${year}`;
  } else {
    return `${month} 16-${new Date(
      year,
      date.getMonth() + 1,
      0
    ).getDate()}, ${year}`;
  }
};
