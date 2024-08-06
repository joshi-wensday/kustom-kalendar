// __tests__/BaseCalendar.test.ts

import { BaseKalendar } from '../src/core/BaseKalendar';
import { CalendarDate, CalendarEvent, CalendarTheme, DatePattern } from '../src/core/CalendarSystem';

// Create a concrete implementation of BaseCalendar for testing
class TestCalendar extends BaseKalendar {
  readonly name: string = 'TestCalendar';
  isLeapYear(year: number): boolean { return year % 4 === 0; }
  daysInYear(year: number): number { return this.isLeapYear(year) ? 366 : 365; }
  daysInMonth(year: number, month: number): number { return 30; }
  dateToOrdinal(date: CalendarDate): number { return date.day; }
  ordinalToDate(year: number, ordinal: number): CalendarDate { return { year, month: 1, day: ordinal }; }
  addDays(date: CalendarDate, days: number): CalendarDate { return { ...date, day: date.day + days }; }
  dayOfWeek(date: CalendarDate): number { return (date.day - 1) % 7 + 1; }
  getMonthRange(): { min: number; max: number } { return { min: 1, max: 12 }; }
}

describe('BaseCalendar', () => {
  let calendar: TestCalendar;

  beforeEach(() => {
    calendar = new TestCalendar();
  });

  test('addEvent and getEvents work correctly', () => {
    const event: CalendarEvent = {
      name: 'Test Event',
      pattern: { type: 'specific', date: { year: 2024, month: 1, day: 1 } },
      type: 'custom'
    };
    calendar.addEvent(event);
    expect(calendar.getEvents({ year: 2024, month: 1, day: 1 })).toContain(event);
    expect(calendar.getEvents({ year: 2024, month: 1, day: 2 })).not.toContain(event);
  });

  test('addTheme and getTheme work correctly', () => {
    const theme: CalendarTheme = {
      name: 'Test Theme',
      pattern: { type: 'weekly', dayOfWeek: 1 },
      style: { color: 'red' }
    };
    calendar.addTheme(theme);
    expect(calendar.getTheme({ year: 2024, month: 1, day: 1 })).toBe(theme);
    expect(calendar.getTheme({ year: 2024, month: 1, day: 2 })).toBeNull();
  });

  test('customizeMonth and getMonthCustomization work correctly', () => {
    const customization = { displayName: 'Test Month', alias: 'TM' };
    calendar.customizeMonth(1, customization);
    expect(calendar.getMonthCustomization(1)).toEqual(customization);
    expect(calendar.getMonthCustomization(2)).toBeNull();
  });

  test('setDayIntention and getDayIntention work correctly', () => {
    const date: CalendarDate = { year: 2024, month: 1, day: 1 };
    const intention = 'Test Intention';
    calendar.setDayIntention(date, intention);
    expect(calendar.getDayIntention(date)).toBe(intention);
    expect(calendar.getDayIntention({ ...date, day: 2 })).toBeNull();
  });

  // Add more tests for week and month intentions, and view generation methods
});