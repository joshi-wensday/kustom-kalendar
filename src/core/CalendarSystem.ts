// src/core/CalendarSystem.ts

import { CalendarViewGenerator, CalendarDayView, CalendarWeekView, CalendarMonthView, CalendarYearView } from './CalendarViews';

export interface CalendarDate {
  year: number;
  month: number;
  day: number;
}

export type DatePattern = 
  | { type: 'specific', date: CalendarDate }
  | { type: 'weekly', dayOfWeek: number }
  | { type: 'monthly', dayOfMonth: number }
  | { type: 'yearly', month: number, day: number }
  | { type: 'custom', predicate: (date: CalendarDate) => boolean };

  export interface CalendarEvent {
    name: string;
    pattern: DatePattern;
    duration?: number; // Number of days, if multi-day event
    type: 'holiday' | 'custom';
  }
  
  export interface CalendarTheme {
    name: string;
    pattern: DatePattern;
    style: object;
  }
  
  export interface MonthCustomization {
    displayName: string;
    alias?: string;
  }
  
  export interface DayCustomization {
    intention?: string;
  }
  
  export interface WeekCustomization {
    intention?: string;
  }
  
  export interface MonthCustomization {
    intention?: string;
  }

export interface CalendarSystem extends CalendarViewGenerator {
  readonly name: string;

  isLeapYear(year: number): boolean;
  daysInYear(year: number): number;
  daysInMonth(year: number, month: number): number;
  dateToOrdinal(date: CalendarDate): number;
  ordinalToDate(year: number, ordinal: number): CalendarDate;
  addDays(date: CalendarDate, days: number): CalendarDate;
  dayOfWeek(date: CalendarDate): number;
  formatDate(date: CalendarDate, format: string): string;
  parseDate(dateString: string, format: string): CalendarDate;
  addEvent(event: CalendarEvent): void;
  getEvents(date: CalendarDate): CalendarEvent[];
  addTheme(theme: CalendarTheme): void;
  getTheme(date: CalendarDate): CalendarTheme | null;
  customizeMonth(month: number, customization: MonthCustomization): void;
  getMonthCustomization(month: number): MonthCustomization | null;
  setDayIntention(date: CalendarDate, intention: string): void;
  getDayIntention(date: CalendarDate): string | null;
  setWeekIntention(year: number, weekNumber: number, intention: string): void;
  getWeekIntention(year: number, weekNumber: number): string | null;
  setMonthIntention(year: number, month: number, intention: string): void;
  getMonthIntention(year: number, month: number): string | null;
}