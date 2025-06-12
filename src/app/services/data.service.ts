import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  /**
   * Gets the start of the week (Monday) for a given date.
   * @param date The date to calculate the start of the week from.
   * @returns A new Date object representing the Monday of that week.
   */
  getStartOfWeek(date: Date): Date {
    const day = date.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday (0) to be last day of prev week or first day of current week
    const startOfWeek = new Date(date.getFullYear(), date.getMonth(), diff);
    startOfWeek.setHours(0, 0, 0, 0); // Set to start of the day
    return startOfWeek;
  }

  /**
   * Adds or subtracts days from a given date.
   * @param date The starting date.
   * @param days The number of days to add (positive) or subtract (negative).
   * @returns A new Date object with the adjusted date.
   */
  addDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
  }

  /**
   * Formats a Date object into a 'YYYY-MM-DD' string.
   * @param date The Date object to format.
   * @returns A formatted date string.
   */
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Checks if two Date objects represent the same day (ignoring time).
   * @param date1 The first date.
   * @param date2 The second date.
   * @returns True if they are the same day, false otherwise.
   */
  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }
}
