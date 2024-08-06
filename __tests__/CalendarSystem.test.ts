// __tests__/CalendarSystem.test.ts

import { CalendarSystem, CalendarDate, CalendarEvent, CalendarTheme } from '../src/core/CalendarSystem';
import { WhensdayKalendar } from '../src/kalendars/WhensdayKalendar';

describe('CalendarSystem Interface', () => {
  let calendar: CalendarSystem;

  beforeEach(() => {
    calendar = new WhensdayKalendar(); // Using WhensdayKalendar as an example implementation
  });

  test('implements all required methods', () => {
    expect(calendar.name).toBeDefined();
    expect(typeof calendar.isLeapYear).toBe('function');
    expect(typeof calendar.daysInYear).toBe('function');
    expect(typeof calendar.daysInMonth).toBe('function');
    expect(typeof calendar.dateToOrdinal).toBe('function');
    expect(typeof calendar.ordinalToDate).toBe('function');
    expect(typeof calendar.addDays).toBe('function');
    expect(typeof calendar.dayOfWeek).toBe('function');
    expect(typeof calendar.addEvent).toBe('function');
    expect(typeof calendar.getEvents).toBe('function');
    expect(typeof calendar.addTheme).toBe('function');
    expect(typeof calendar.getTheme).toBe('function');
    expect(typeof calendar.customizeMonth).toBe('function');
    expect(typeof calendar.getMonthCustomization).toBe('function');
    expect(typeof calendar.setDayIntention).toBe('function');
    expect(typeof calendar.getDayIntention).toBe('function');
    expect(typeof calendar.setWeekIntention).toBe('function');
    expect(typeof calendar.getWeekIntention).toBe('function');
    expect(typeof calendar.setMonthIntention).toBe('function');
    expect(typeof calendar.getMonthIntention).toBe('function');
  });

  // Add more specific tests for each method if needed
});