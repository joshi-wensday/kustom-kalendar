// __tests__/StandardTimeUnits.test.ts

import { ScientificUnits, CalendarUnits, isLeapYear } from '../src/core/StandardTimeUnits';
import { TimeUnit, TimeUnitType } from '../src/core/TimeUnit';

describe('StandardTimeUnits', () => {
  describe('ScientificUnits', () => {
    it('should define SECOND as the base unit', () => {
      expect(ScientificUnits.SECOND).toBe(TimeUnit.SECOND);
    });

    it('should define MINUTE as 60 seconds', () => {
      expect(ScientificUnits.MINUTE.duration).toBe(60);
      expect(ScientificUnits.MINUTE.baseUnit).toBe(TimeUnit.SECOND);
    });

    it('should define HOUR as 3600 seconds', () => {
      expect(ScientificUnits.HOUR.duration).toBe(3600);
      expect(ScientificUnits.HOUR.baseUnit).toBe(TimeUnit.SECOND);
    });

    it('should define DAY as 86400 seconds', () => {
      expect(ScientificUnits.DAY.duration).toBe(86400);
      expect(ScientificUnits.DAY.baseUnit).toBe(TimeUnit.SECOND);
    });

    it('should define WEEK as 604800 seconds', () => {
      expect(ScientificUnits.WEEK.duration).toBe(604800);
      expect(ScientificUnits.WEEK.baseUnit).toBe(TimeUnit.SECOND);
    });

    it('should define YEAR close to 31556952 seconds', () => {
      expect(ScientificUnits.YEAR.duration).toBeCloseTo(31556952, 0);
      expect(ScientificUnits.YEAR.baseUnit).toBe(TimeUnit.SECOND);
    });
  });

  describe('CalendarUnits', () => {
    it('should define SECOND as the base unit', () => {
      expect(CalendarUnits.SECOND).toBe(TimeUnit.SECOND);
    });

    it('should define MINUTE as 60 seconds', () => {
      expect(CalendarUnits.MINUTE.duration).toBe(60);
      expect(CalendarUnits.MINUTE.baseUnit).toBe(TimeUnit.SECOND);
    });

    it('should define HOUR as 60 minutes', () => {
      expect(CalendarUnits.HOUR.duration).toBe(60);
      expect(CalendarUnits.HOUR.baseUnit).toBe(ScientificUnits.MINUTE);
    });

    it('should define DAY as 24 hours', () => {
      expect(CalendarUnits.DAY.duration).toBe(24);
      expect(CalendarUnits.DAY.baseUnit).toBe(ScientificUnits.HOUR);
    });

    it('should define WEEK as 7 days', () => {
      expect(CalendarUnits.WEEK.duration).toBe(7);
      expect(CalendarUnits.WEEK.baseUnit).toBe(ScientificUnits.DAY);
    });

    it('should define various MONTH types correctly', () => {
      expect(CalendarUnits.MONTH_28.duration).toBe(28);
      expect(CalendarUnits.MONTH_29.duration).toBe(29);
      expect(CalendarUnits.MONTH_30.duration).toBe(30);
      expect(CalendarUnits.MONTH_31.duration).toBe(31);
      expect(CalendarUnits.MONTH_28.baseUnit).toBe(ScientificUnits.DAY);
    });

    it('should define YEAR types correctly', () => {
      expect(CalendarUnits.YEAR_365.duration).toBe(365);
      expect(CalendarUnits.YEAR_366.duration).toBe(366);
      expect(CalendarUnits.YEAR_365.baseUnit).toBe(ScientificUnits.DAY);
    });
  });

  describe('isLeapYear', () => {
    it('should return true for years divisible by 4 but not 100', () => {
      expect(isLeapYear(2004)).toBe(true);
      expect(isLeapYear(2008)).toBe(true);
    });

    it('should return false for years divisible by 100 but not 400', () => {
      expect(isLeapYear(1900)).toBe(false);
      expect(isLeapYear(2100)).toBe(false);
    });

    it('should return true for years divisible by 400', () => {
      expect(isLeapYear(2000)).toBe(true);
      expect(isLeapYear(2400)).toBe(true);
    });

    it('should return false for non-leap years', () => {
      expect(isLeapYear(2001)).toBe(false);
      expect(isLeapYear(2002)).toBe(false);
      expect(isLeapYear(2003)).toBe(false);
    });
  });
});