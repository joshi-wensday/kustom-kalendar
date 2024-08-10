// src/core/TimeRange.ts

import { TimePoint } from './TimePoint';
import { Duration } from './Duration';
import { convertToTimezone, convertToUnit } from '../utils/timezoneUtils'; 

/**
 * Represents a range of time in the Kustom Kalendar system.
 */
export class TimeRange {
  public readonly duration: Duration;

  /**
   * Creates a new TimeRange instance.
   * @param start - The starting TimePoint of the range.
   * @param end - The ending TimePoint of the range.
   */
  constructor(
    public readonly start: TimePoint,
    public readonly end: TimePoint
  ) {
    // Convert end to start's timezone and unit if necessary
    if (start.timezone !== end.timezone || start.unit !== end.unit) {
      const convertedEnd = convertToTimezone(end, start.timezone);
      this.end = convertToUnit(convertedEnd, start.unit);
    } else {
      this.end = end;
    }

    this.duration = new Duration(this.end.value - this.start.value, this.start.unit);

    if (this.duration.value < 0) {
      throw new Error('End time must be after start time.');
    }
  }

  /**
   * Checks if a given TimePoint is contained within this TimeRange.
   * @param point - The TimePoint to check.
   * @returns True if the point is within the range, false otherwise.
   */
  contains(point: TimePoint): boolean {
    return point.value >= this.start.value && point.value <= this.end.value;
  }

  /**
   * Checks if this TimeRange overlaps with another TimeRange.
   * @param other - The other TimeRange to check for overlap.
   * @returns True if the ranges overlap, false otherwise.
   */
  overlaps(other: TimeRange): boolean {
    return this.start.value < other.end.value && this.end.value > other.start.value;
  }

  /**
   * Calculates the intersection of this TimeRange with another TimeRange.
   * @param other - The other TimeRange to intersect with.
   * @returns A new TimeRange representing the intersection, or null if there is no intersection.
   */
  intersection(other: TimeRange): TimeRange | null {
    if (!this.overlaps(other)) {
      return null;
    }

    const intersectionStart = new TimePoint(
      'intersection_start',
      Math.max(this.start.value, other.start.value),
      this.start.unit,
      this.start.timezone
    );

    const intersectionEnd = new TimePoint(
      'intersection_end',
      Math.min(this.end.value, other.end.value),
      this.end.unit,
      this.end.timezone
    );

    return new TimeRange(intersectionStart, intersectionEnd);
  }
}