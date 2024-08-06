// src/kalendars/GregorianKalendar.ts

import { BaseKalendar } from '../core/BaseKalendar';
import { CalendarDate } from '../core/CalendarSystem';

export class GregorianKalendar extends BaseKalendar {
  readonly name: string = 'Gregorian';

  isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  daysInYear(year: number): number {
    return this.isLeapYear(year) ? 366 : 365;
  }

  getMonthRange(): { min: number; max: number } {
    return { min: 1, max: 12 };
  }

  daysInMonth(year: number, month: number): number {
    const { min, max } = this.getMonthRange();
    if (month < min || month > max) {
      throw new Error(`Invalid month: ${month}. Valid range is ${min} to ${max}.`);
    }
    const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2 && this.isLeapYear(year)) {
      return 29;
    }
    return daysPerMonth[month - 1];
  }

  dateToOrdinal(date: CalendarDate): number {
    let ordinal = date.day;
    for (let m = 1; m < date.month; m++) {
      ordinal += this.daysInMonth(date.year, m);
    }
    return ordinal;
  }

  ordinalToDate(year: number, ordinal: number): CalendarDate {
    let month = 1;
    while (ordinal > this.daysInMonth(year, month)) {
      ordinal -= this.daysInMonth(year, month);
      month++;
    }
    return { year, month, day: ordinal };
  }

  addDays(date: CalendarDate, days: number): CalendarDate {
    const newDate = new Date(date.year, date.month - 1, date.day + days);
    return { year: newDate.getFullYear(), month: newDate.getMonth() + 1, day: newDate.getDate() };
  }

  dayOfWeek(date: CalendarDate): number {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() + 1; // 1-7, with 1 being Sunday
  }
}