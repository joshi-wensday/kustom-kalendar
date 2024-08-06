// src/utils/calendarConversion.ts

import { CalendarSystem, CalendarDate } from '../core/CalendarSystem';

export function convertBetweenCalendars(
  sourceCalendar: CalendarSystem,
  targetCalendar: CalendarSystem,
  date: CalendarDate
): CalendarDate {
  // Convert to days since epoch (2024-01-01 Gregorian)
  const daysSinceEpoch = calculateDaysSinceEpoch(sourceCalendar, date);
  
  // Convert from days since epoch to target calendar date
  return dateFromDaysSinceEpoch(targetCalendar, daysSinceEpoch);
}

function calculateDaysSinceEpoch(calendar: CalendarSystem, date: CalendarDate): number {
  const epochYear = 2024;
  let days = 0;

  if (date.year > epochYear) {
    for (let y = epochYear; y < date.year; y++) {
      days += calendar.daysInYear(y);
    }
    days += calendar.dateToOrdinal(date);
  } else if (date.year < epochYear) {
    for (let y = date.year; y < epochYear; y++) {
      days -= calendar.daysInYear(y);
    }
    days += calendar.dateToOrdinal(date) - calendar.daysInYear(date.year);
  } else {
    days = calendar.dateToOrdinal(date) - 1; // -1 because epoch starts at 1
  }

  return days;
}

function dateFromDaysSinceEpoch(calendar: CalendarSystem, days: number): CalendarDate {
  let year = 2024; // Epoch year
  
  while (days >= calendar.daysInYear(year)) {
    days -= calendar.daysInYear(year);
    year++;
  }
  while (days < 0) {
    year--;
    days += calendar.daysInYear(year);
  }

  return calendar.ordinalToDate(year, days + 1); // +1 because ordinal dates start at 1
}