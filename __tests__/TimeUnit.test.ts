// __tests__/TimeUnit.test.ts

import { TimeUnit, TimeUnitType } from '../src/core/TimeUnit';

describe('TimeUnit', () => {
  describe('constructor', () => {
    it('should create a TimeUnit with correct properties', () => {
      const second = new TimeUnit('second', 1, null, TimeUnitType.Second);
      expect(second.name).toBe('second');
      expect(second.duration).toBe(1);
      expect(second.baseUnit).toBeNull();
      expect(second.type).toBe(TimeUnitType.Second);
    });

    it('should set the static SECOND property when creating a second unit', () => {
        const second = new TimeUnit('second', 1, null, TimeUnitType.Second);
        expect(TimeUnit.SECOND).toEqual(second);
    });
  });

  

  describe('addChildUnit', () => {
    it('should add a child unit', () => {
      const second = new TimeUnit('second', 1, null, TimeUnitType.Second);
      const minute = new TimeUnit('minute', 60, second, TimeUnitType.SubDay);
      expect(second.childUnits).toContain(minute);
    });

    it('should not add the same child unit twice', () => {
      const second = new TimeUnit('second', 1, null, TimeUnitType.Second);
      const minute = new TimeUnit('minute', 60, second, TimeUnitType.SubDay);
      second.addChildUnit(minute);
      expect(second.childUnits.filter(unit => unit === minute).length).toBe(1);
    });
  });

  describe('removeChildUnit', () => {
    it('should remove a child unit', () => {
      const second = new TimeUnit('second', 1, null, TimeUnitType.Second);
      const minute = new TimeUnit('minute', 60, second, TimeUnitType.SubDay);
      second.removeChildUnit(minute);
      expect(second.childUnits).not.toContain(minute);
    });
  });

  describe('time', () => {
    it('should return correct duration and unit for a base unit', () => {
      const second = new TimeUnit('second', 1, null, TimeUnitType.Second);
      expect(second.time()).toEqual({ duration: 1, unit: 'base' });
    });

    it('should return correct duration and unit for a non-base unit', () => {
      const second = new TimeUnit('second', 1, null, TimeUnitType.Second);
      const minute = new TimeUnit('minute', 60, second, TimeUnitType.SubDay);
      expect(minute.time()).toEqual({ duration: 60, unit: 'second' });
    });
  });

  describe('toBaseUnit', () => {
    it('should convert correctly to base unit', () => {
      const second = new TimeUnit('second', 1, null, TimeUnitType.Second);
      const minute = new TimeUnit('minute', 60, second, TimeUnitType.SubDay);
      const hour = new TimeUnit('hour', 60, minute, TimeUnitType.SubDay);
      expect(hour.toBaseUnit(2)).toBe(7200); // 2 hours = 7200 seconds
    });
  });

  describe('fromBaseUnit', () => {
    it('should convert correctly from base unit', () => {
      const second = new TimeUnit('second', 1, null, TimeUnitType.Second);
      const minute = new TimeUnit('minute', 60, second, TimeUnitType.SubDay);
      const hour = new TimeUnit('hour', 60, minute, TimeUnitType.SubDay);
      expect(hour.fromBaseUnit(7200)).toBe(2); // 7200 seconds = 2 hours
    });
  });

  describe('convertTo', () => {
    it('should convert correctly between units', () => {
      const second = new TimeUnit('second', 1, null, TimeUnitType.Second);
      const minute = new TimeUnit('minute', 60, second, TimeUnitType.SubDay);
      const hour = new TimeUnit('hour', 60, minute, TimeUnitType.SubDay);
      expect(hour.convertTo(2, minute)).toBe(120); // 2 hours = 120 minutes
    });
  });
});