// __tests__/utils/timezoneUtils.test.ts

import { convertToTimezone, convertToUnit } from '../../src/utils/timezoneUtils';
import { TimePoint } from '../../src/core/TimePoint';
import { TimeUnit } from '../../src/core/TimeUnit';

describe('timezoneUtils', () => {
  let second: TimeUnit;
  let minute: TimeUnit;

  beforeEach(() => {
    second = new TimeUnit('second', 'Second', 's', null, 1, true);
    minute = new TimeUnit('minute', 'Minute', 'min', second, 60, true);
  });

  describe('convertToTimezone', () => {
    it('should convert a TimePoint to a different timezone', () => {
      const point = new TimePoint('point1', 1609459200, second, 'UTC'); // 2021-01-01 00:00:00 UTC
      const convertedPoint = convertToTimezone(point, 'America/New_York');

      expect(convertedPoint.timezone).toBe('America/New_York');
      expect(convertedPoint.value).toBe(1609459200 - 5 * 3600); // 5 hours earlier
    });

    it('should handle daylight saving time transitions', () => {
      const point = new TimePoint('point1', 1615698000, second, 'America/New_York'); // 2021-03-14 01:00:00 EST
      const convertedPoint = convertToTimezone(point, 'UTC');

      expect(convertedPoint.timezone).toBe('UTC');
      expect(convertedPoint.value).toBe(1615698000 + 4 * 3600); // 4 hours later (DST transition)
    });
  });

  describe('convertToUnit', () => {
    it('should convert a TimePoint to a different unit', () => {
      const point = new TimePoint('point1', 120, second, 'UTC');
      const convertedPoint = convertToUnit(point, minute);

      expect(convertedPoint.unit).toBe(minute);
      expect(convertedPoint.value).toBe(2);
    });

    it('should handle conversion to smaller units', () => {
      const point = new TimePoint('point1', 2, minute, 'UTC');
      const convertedPoint = convertToUnit(point, second);

      expect(convertedPoint.unit).toBe(second);
      expect(convertedPoint.value).toBe(120);
    });
  });
});