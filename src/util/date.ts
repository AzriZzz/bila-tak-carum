import { MONTHS } from "@/constant/date";

export const isLeapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const getDaysInYear = (year: number) => {
  return isLeapYear(year) ? 366 : 365;
};

export const getDaysInMonth = (year: number, monthString: string) => {
  const month = MONTHS.indexOf(monthString);

  if (month === -1) {
    console.error("Invalid month string");
    return -1; // Error value
  }

  // JavaScript months are zero-indexed, so we use the next month for calculations
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  return lastDayOfMonth;
};