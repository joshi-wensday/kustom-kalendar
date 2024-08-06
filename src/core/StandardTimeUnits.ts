// src/core/StandardTimeUnits.ts

import { TimeUnit, TimeUnitType } from './TimeUnit';

export type TimeUnitGroup = {
  [key: string]: TimeUnit;
};

/**
 * Defines standard time units based on scientific measurements.
 */
export const ScientificUnits: TimeUnitGroup = {
  SECOND: TimeUnit.SECOND,
  MINUTE: new TimeUnit('minute', 60, TimeUnit.SECOND, TimeUnitType.SubDay),
  HOUR: new TimeUnit('hour', 3600, TimeUnit.SECOND, TimeUnitType.SubDay),
  DAY: new TimeUnit('day', 86400, TimeUnit.SECOND, TimeUnitType.Day),
  WEEK: new TimeUnit('week', 604800, TimeUnit.SECOND, TimeUnitType.SubYear),
  MONTH: new TimeUnit('month', 2629746, TimeUnit.SECOND, TimeUnitType.SubYear), // Average month (365.24219 days / 12)
  YEAR: new TimeUnit('year', 31556952, TimeUnit.SECOND, TimeUnitType.Year), // Tropical year (365.24219 days)
};

/**
 * Defines simplified time units commonly used in calendars.
 */
export const CalendarUnits: TimeUnitGroup = {
  SECOND: TimeUnit.SECOND,
  MINUTE: new TimeUnit('minute', 60, TimeUnit.SECOND, TimeUnitType.SubDay),
  HOUR: new TimeUnit('hour', 60, ScientificUnits.MINUTE, TimeUnitType.SubDay),
  DAY: new TimeUnit('day', 24, ScientificUnits.HOUR, TimeUnitType.Day),
  WEEK: new TimeUnit('week', 7, ScientificUnits.DAY, TimeUnitType.SubYear),
  MONTH_28: new TimeUnit('28-day month', 28, ScientificUnits.DAY, TimeUnitType.SubYear),
  MONTH_29: new TimeUnit('29-day month', 29, ScientificUnits.DAY, TimeUnitType.SubYear),
  MONTH_30: new TimeUnit('30-day month', 30, ScientificUnits.DAY, TimeUnitType.SubYear),
  MONTH_31: new TimeUnit('31-day month', 31, ScientificUnits.DAY, TimeUnitType.SubYear),
  YEAR_365: new TimeUnit('365-day year', 365, ScientificUnits.DAY, TimeUnitType.Year),
  YEAR_366: new TimeUnit('366-day year', 366, ScientificUnits.DAY, TimeUnitType.Year),
};

/**
 * Determines if a given year is a leap year in the Gregorian calendar.
 * @param year - The year to check.
 * @returns True if the year is a leap year, false otherwise.
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}