// __tests__/GregorianKalendar.test.ts

import { GregorianKalendar } from '../src/kalendars/GregorianKalendar';

describe('GregorianKalendar', () => {
  let calendar: GregorianKalendar;

  beforeEach(() => {
    calendar = new GregorianKalendar();
  });

  test('isLeapYear correctly identifies leap years', () => {
    expect(calendar.isLeapYear(2000)).toBe(true);
    expect(calendar.isLeapYear(2004)).toBe(true);
    expect(calendar.isLeapYear(2100)).toBe(false);
    expect(calendar.isLeapYear(2023)).toBe(false);
  });

  test('daysInYear returns correct number of days', () => {
    expect(calendar.daysInYear(2023)).toBe(365);
    expect(calendar.daysInYear(2024)).toBe(366);
  });

  test('daysInMonth returns correct number of days for each month', () => {
    expect(calendar.daysInMonth(2023, 1)).toBe(31); // January
    expect(calendar.daysInMonth(2023, 2)).toBe(28); // February in non-leap year
    expect(calendar.daysInMonth(2024, 2)).toBe(29); // February in leap year
    expect(calendar.daysInMonth(2023, 4)).toBe(30); // April
  });

  test('dateToOrdinal correctly converts date to ordinal', () => {
    expect(calendar.dateToOrdinal({ year: 2023, month: 1, day: 1 })).toBe(1);
    expect(calendar.dateToOrdinal({ year: 2023, month: 12, day: 31 })).toBe(365);
    expect(calendar.dateToOrdinal({ year: 2024, month: 12, day: 31 })).toBe(366);
  });

  test('ordinalToDate correctly converts ordinal to date', () => {
    expect(calendar.ordinalToDate(2023, 1)).toEqual({ year: 2023, month: 1, day: 1 });
    expect(calendar.ordinalToDate(2023, 365)).toEqual({ year: 2023, month: 12, day: 31 });
    expect(calendar.ordinalToDate(2024, 366)).toEqual({ year: 2024, month: 12, day: 31 });
  });

  test('addDays correctly adds days to a date', () => {
    expect(calendar.addDays({ year: 2023, month: 12, day: 31 }, 1)).toEqual({ year: 2024, month: 1, day: 1 });
    expect(calendar.addDays({ year: 2024, month: 2, day: 28 }, 1)).toEqual({ year: 2024, month: 2, day: 29 });
    expect(calendar.addDays({ year: 2023, month: 2, day: 28 }, 1)).toEqual({ year: 2023, month: 3, day: 1 });
  });

  test('dayOfWeek returns correct day of the week', () => {
    expect(calendar.dayOfWeek({ year: 2023, month: 7, day: 23 })).toBe(1); // Sunday
    expect(calendar.dayOfWeek({ year: 2023, month: 7, day: 24 })).toBe(2); // Monday
    expect(calendar.dayOfWeek({ year: 2023, month: 7, day: 29 })).toBe(7); // Saturday
  });
});