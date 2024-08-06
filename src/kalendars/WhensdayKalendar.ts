// src/kalendars/WhensdayKalendar.ts

import { BaseKalendar } from '../core/BaseKalendar';
import { CalendarDate } from '../core/CalendarSystem';
import { CalendarMonthView, CalendarWeekView, CalendarDayView } from '../core/CalendarViews';

export class WhensdayKalendar extends BaseKalendar {
  readonly name: string = 'Whensday';

  isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  daysInYear(year: number): number {
    return this.isLeapYear(year) ? 366 : 365;
  }

  getMonthRange(): { min: number; max: number } {
    return { min: 0, max: 13 };
  }

  daysInMonth(year: number, month: number): number {
    const { min, max } = this.getMonthRange();
    if (month < min || month > max) {
      throw new Error(`Invalid month: ${month}. Valid range is ${min} to ${max}.`);
    }
    if (month === 0) return 1; // Weensday
    if (month === 7 && this.isLeapYear(year)) return 29; // Leap month
    return 28;
  }

  dateToOrdinal(date: CalendarDate): number {
    if (date.month === 0 && date.day === 1) return 1; // Weensday
    let ordinal = 1; // Start from 1 because of Weensday
    for (let m = 1; m < date.month; m++) {
      ordinal += this.daysInMonth(date.year, m);
    }
    ordinal += date.day;
    return ordinal;
  }

  ordinalToDate(year: number, ordinal: number): CalendarDate {
    if (ordinal === 1) return { year, month: 0, day: 1 }; // Weensday
    ordinal -= 1; // Adjust for Weensday
    let month = 1;
    while (ordinal > this.daysInMonth(year, month)) {
      ordinal -= this.daysInMonth(year, month);
      month++;
      if (month > 13) {
        year++;
        month = 1;
      }
    }
    return { year, month, day: ordinal };
  }

  addDays(date: CalendarDate, days: number): CalendarDate {
    let ordinal = this.dateToOrdinal(date) + days;
    let year = date.year;
    while (ordinal > this.daysInYear(year)) {
      ordinal -= this.daysInYear(year);
      year++;
    }
    while (ordinal <= 0) {
      year--;
      ordinal += this.daysInYear(year);
    }
    return this.ordinalToDate(year, ordinal);
  }

  dayOfWeek(date: CalendarDate): number {
    const ordinal = this.dateToOrdinal(date);
    return ((ordinal - 1) % 7) + 1; // 1-7, with 1 being the first day of the week
  }

  generateMonthView(year: number, month: number): CalendarMonthView {
    if (month === 0) {
      // Special case for Weensday
      const weensday = this.generateDayView({ year, month: 0, day: 1 });
      return {
        year,
        month: 0,
        weeks: [{ startDate: weensday.date, endDate: weensday.date, days: [weensday], intention: null }],
        customization: this.getMonthCustomization(0),
        intention: this.getMonthIntention(year, 0)
      };
    }
    
    return super.generateMonthView(year, month);
  }

  generateWeekView(startDate: CalendarDate): CalendarWeekView {
    const days: CalendarDayView[] = [];
    for (let i = 0; i < 7 && (i === 0 || startDate.month === days[days.length - 1].date.month); i++) {
      const currentDate = this.addDays(startDate, i);
      days.push(this.generateDayView(currentDate));
    }
    return {
      startDate,
      endDate: days[days.length - 1].date,
      days,
      intention: this.getWeekIntention(startDate.year, this.getWeekNumber(startDate))
    };
  }
}