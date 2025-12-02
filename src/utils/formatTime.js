export const formatTime = (dateStr) => {
  try {
    return new Date(dateStr).toLocaleString();
  } catch {
    return "";
  }
};
