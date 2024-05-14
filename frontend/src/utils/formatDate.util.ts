import dateFormat from "dateformat";

export const formatDate = (date: string, mask?: string) => {
  if (!mask) {
    mask = "dddd, mmmm dS, yyyy, h:MM:ss TT";
  }
  return dateFormat(date, mask);
};
