// __tests__/core/TimeRange.test.ts

import { TimeRange } from '../../src/core/TimeRange';
import { TimeUnit } from '../../src/core/TimeUnit';
import { TimePoint } from '../../src/core/TimePoint';
import { Duration } from '../../src/core/Duration';

describe('TimeRange', () => {
  let start: TimePoint;
  let end: TimePoint;
  let range: TimeRange;
  let MINUTE: TimeUnit;

  beforeEach(() => {
    start = new TimePoint('start', 0, TimePoint.SECOND, 'UTC');
    end = new TimePoint('end', 3600, TimePoint.SECOND, 'UTC');
    range = new TimeRange(start, end);
    MINUTE = new TimeUnit('minute', 'Minute', 'm', TimePoint.SECOND, 60, true)
});

  it('should create a TimeRange instance', () => {
    expect(range).toBeInstanceOf(TimeRange);
    expect(range.start).toBe(start);
    expect(range.end).toBe(end);
  });

  it('should calculate duration correctly', () => {
    expect(range.duration).toEqual(new Duration(3600, TimePoint.SECOND));
  });

  it('should check if a point is contained within the range', () => {
    const midPoint = new TimePoint('mid', 1800, TimePoint.SECOND, 'UTC');
    const beforePoint = new TimePoint('before', -1, TimePoint.SECOND, 'UTC');
    const afterPoint = new TimePoint('after', 3601, TimePoint.SECOND, 'UTC');

    expect(range.contains(start)).toBe(true);
    expect(range.contains(end)).toBe(true);
    expect(range.contains(midPoint)).toBe(true);
    expect(range.contains(beforePoint)).toBe(false);
    expect(range.contains(afterPoint)).toBe(false);
  });

  it('should check if it overlaps with another TimeRange', () => {
    const overlappingRange = new TimeRange(
      new TimePoint('overlap_start', 1800, TimePoint.SECOND, 'UTC'),
      new TimePoint('overlap_end', 5400, TimePoint.SECOND, 'UTC')
    );
    const nonOverlappingRange = new TimeRange(
      new TimePoint('non_overlap_start', 3601, TimePoint.SECOND, 'UTC'),
      new TimePoint('non_overlap_end', 7200, TimePoint.SECOND, 'UTC')
    );

    expect(range.overlaps(overlappingRange)).toBe(true);
    expect(range.overlaps(nonOverlappingRange)).toBe(false);
  });

  it('should calculate intersection with another TimeRange', () => {
    const overlappingRange = new TimeRange(
      new TimePoint('overlap_start', 1800, TimePoint.SECOND, 'UTC'),
      new TimePoint('overlap_end', 5400, TimePoint.SECOND, 'UTC')
    );
    const intersection = range.intersection(overlappingRange);

    expect(intersection).not.toBeNull();
    expect(intersection?.start.value).toBe(1800);
    expect(intersection?.end.value).toBe(3600);

    const nonOverlappingRange = new TimeRange(
      new TimePoint('non_overlap_start', 3601, TimePoint.SECOND, 'UTC'),
      new TimePoint('non_overlap_end', 7200, TimePoint.SECOND, 'UTC')
    );
    expect(range.intersection(nonOverlappingRange)).toBeNull();
  });

  it('should handle different units for start and end', () => {
    const startSecond = new TimePoint('start', 0, TimePoint.SECOND, 'UTC');
    const endMinute = new TimePoint('end', 1, MINUTE, 'UTC');
    const range = new TimeRange(startSecond, endMinute);

    expect(range.duration.value).toBe(60);
    expect(range.duration.unit).toBe(TimePoint.SECOND);
  });

  it('should throw an error if end is before start', () => {
    const start = new TimePoint('start', 3600, TimePoint.SECOND, 'UTC');
    const end = new TimePoint('end', 0, TimePoint.SECOND, 'UTC');

    expect(() => new TimeRange(start, end)).toThrow('End time must be after start time.');
  });
});