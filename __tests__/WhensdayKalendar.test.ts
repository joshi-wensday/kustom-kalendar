// __tests__/WhensdayKalendar.test.ts

import { WhensdayKalendar } from '../src/kalendars/WhensdayKalendar';
import { CalendarDate } from '../src/core/CalendarSystem';

describe('WhensdayKalendar', () => {
  let calendar: WhensdayKalendar;

  beforeEach(() => {
    calendar = new WhensdayKalendar();
  });

  test('isLeapYear correctly identifies leap years', () => {
    expect(calendar.isLeapYear(2024)).toBe(true);
    expect(calendar.isLeapYear(2025)).toBe(false);
    expect(calendar.isLeapYear(2100)).toBe(false);
    expect(calendar.isLeapYear(2400)).toBe(true);
  });

  test('daysInYear returns correct number of days', () => {
    expect(calendar.daysInYear(2023)).toBe(365);
    expect(calendar.daysInYear(2024)).toBe(366);
  });

  test('daysInMonth returns correct number of days for each month', () => {
    expect(calendar.daysInMonth(2024, 0)).toBe(1); // Weensday
    expect(calendar.daysInMonth(2024, 1)).toBe(28);
    expect(calendar.daysInMonth(2024, 7)).toBe(29); // Leap year in Whensday
    expect(calendar.daysInMonth(2025, 7)).toBe(28); // Not a leap year in Whensday
    expect(calendar.daysInMonth(2024, 13)).toBe(28);
  });

  test('dateToOrdinal correctly converts date to ordinal', () => {
    expect(calendar.dateToOrdinal({ year: 2024, month: 0, day: 1 })).toBe(1); // Weensday
    expect(calendar.dateToOrdinal({ year: 2024, month: 1, day: 1 })).toBe(2);
    expect(calendar.dateToOrdinal({ year: 2024, month: 13, day: 28 })).toBe(366);
    expect(calendar.dateToOrdinal({ year: 2025, month: 13, day: 28 })).toBe(365);
  });

  test('ordinalToDate correctly converts ordinal to date', () => {
    expect(calendar.ordinalToDate(2024, 1)).toEqual({ year: 2024, month: 0, day: 1 }); // Weensday
    expect(calendar.ordinalToDate(2024, 2)).toEqual({ year: 2024, month: 1, day: 1 });
    expect(calendar.ordinalToDate(2024, 366)).toEqual({ year: 2024, month: 13, day: 28 });
    expect(calendar.ordinalToDate(2025, 365)).toEqual({ year: 2025, month: 13, day: 28 });
  });

  test('addDays correctly adds days to a date', () => {
    expect(calendar.addDays({ year: 2024, month: 0, day: 1 }, 1)).toEqual({ year: 2024, month: 1, day: 1 });
    expect(calendar.addDays({ year: 2024, month: 13, day: 28 }, 1)).toEqual({ year: 2025, month: 0, day: 1 });
    expect(calendar.addDays({ year: 2024, month: 7, day: 28 }, 1)).toEqual({ year: 2024, month: 7, day: 29 }); // Leap day
    expect(calendar.addDays({ year: 2025, month: 7, day: 28 }, 1)).toEqual({ year: 2025, month: 8, day: 1 }); // Non-leap year
  });

  test('dayOfWeek returns correct day of the week', () => {
    expect(calendar.dayOfWeek({ year: 2024, month: 0, day: 1 })).toBe(1); // Weensday
    expect(calendar.dayOfWeek({ year: 2024, month: 1, day: 1 })).toBe(2);
    expect(calendar.dayOfWeek({ year: 2024, month: 1, day: 7 })).toBe(1);
  });
});