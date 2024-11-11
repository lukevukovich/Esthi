// Format date for treatment record
export function formatDate(date) {
  const [year, month, day] = date.split("-");
  const dateObj = new Date(year, month - 1, day);
  return dateObj.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });
}
