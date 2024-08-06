// __tests__/CalendarViews.test.ts

import { WhensdayKalendar } from '../src/kalendars/WhensdayKalendar';
import { CalendarDayView, CalendarWeekView, CalendarMonthView, CalendarYearView } from '../src/core/CalendarViews';

describe('CalendarViews', () => {
  let calendar: WhensdayKalendar;

  beforeEach(() => {
    calendar = new WhensdayKalendar();
  });

  test('generateDayView returns correct structure', () => {
    const dayView = calendar.generateDayView({ year: 2024, month: 1, day: 1 });
    expect(dayView).toHaveProperty('date');
    expect(dayView).toHaveProperty('events');
    expect(dayView).toHaveProperty('theme');
    expect(dayView).toHaveProperty('intention');
  });

  test('generateWeekView returns correct structure', () => {
    const weekView = calendar.generateWeekView({ year: 2024, month: 1, day: 1 });
    expect(weekView).toHaveProperty('startDate');
    expect(weekView).toHaveProperty('endDate');
    expect(weekView).toHaveProperty('days');
    expect(weekView).toHaveProperty('intention');
    expect(weekView.days.length).toBeGreaterThan(0);
    expect(weekView.days.length).toBeLessThanOrEqual(7);
  });

  test('generateMonthView returns correct structure for regular month', () => {
    const monthView = calendar.generateMonthView(2024, 1);
    expect(monthView).toHaveProperty('year');
    expect(monthView).toHaveProperty('month');
    expect(monthView).toHaveProperty('weeks');
    expect(monthView).toHaveProperty('customization');
    expect(monthView).toHaveProperty('intention');
    expect(monthView.weeks.length).toBe(4);
  });

  test('generateMonthView returns correct structure for Weensday', () => {
    const monthView = calendar.generateMonthView(2024, 0);
    expect(monthView).toHaveProperty('year');
    expect(monthView).toHaveProperty('month');
    expect(monthView).toHaveProperty('weeks');
    expect(monthView).toHaveProperty('customization');
    expect(monthView).toHaveProperty('intention');
    expect(monthView.weeks.length).toBe(1);
    expect(monthView.weeks[0].days.length).toBe(1);
  });

  test('generateYearView returns correct structure', () => {
    const yearView = calendar.generateYearView(2024);
    expect(yearView).toHaveProperty('year');
    expect(yearView).toHaveProperty('months');
    expect(yearView.months.length).toBe(14); // 0 to 13 (including Weensday)
    expect(yearView.months[0].month).toBe(0); // Weensday
    expect(yearView.months[13].month).toBe(13);
  });

  test('view generation methods complete in a reasonable time', () => {
    const start = Date.now();
    
    calendar.generateDayView({ year: 2024, month: 1, day: 1 });
    calendar.generateWeekView({ year: 2024, month: 1, day: 1 });
    calendar.generateMonthView(2024, 1);
    calendar.generateYearView(2024);
    
    const end = Date.now();
    const duration = end - start;
    
    expect(duration).toBeLessThan(1000); // Should complete in less than 1 second
  });
});