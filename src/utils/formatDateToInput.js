function formatDateToInput(dateString) {
  if (!dateString) return ""; // Return empty if no date

  const date = new Date(dateString); // Parse ISO string into a Date object

  // Ensure the Date object is valid
  if (isNaN(date.getTime())) return "";

  // Format to YYYY-MM-DD
  return date.toISOString().split("T")[0];
}

export default formatDateToInput;
