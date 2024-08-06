// src/core/CalendarViews.ts

import { CalendarDate, CalendarEvent, CalendarTheme, MonthCustomization } from './CalendarSystem';

export interface CalendarDayView {
  date: CalendarDate;
  events: CalendarEvent[];
  theme: CalendarTheme | null;
  intention: string | null;
}

export interface CalendarWeekView {
  startDate: CalendarDate;
  endDate: CalendarDate;
  days: CalendarDayView[];
  intention: string | null;
}

export interface CalendarMonthView {
  year: number;
  month: number;
  weeks: CalendarWeekView[];
  customization: MonthCustomization | null;
  intention: string | null;
}

export interface CalendarYearView {
  year: number;
  months: CalendarMonthView[];
}
  
  export interface CalendarViewGenerator {
    generateDayView(date: CalendarDate): CalendarDayView;
    generateWeekView(startDate: CalendarDate): CalendarWeekView;
    generateMonthView(year: number, month: number): CalendarMonthView;
    generateYearView(year: number): CalendarYearView;
  }