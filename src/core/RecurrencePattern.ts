// src/core/RecurrencePattern.ts

import { TimePoint } from './TimePoint';

export enum RecurrenceFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}

export type RecurrenceEndCondition = {
  type: 'count' | 'until';
  value: number | TimePoint;
};

/**
 * Represents a pattern for recurring events in the Kustom Kalendar system.
 */
export class RecurrencePattern {
  /**
   * Creates a new RecurrencePattern instance.
   * @param frequency - The frequency of recurrence.
   * @param interval - The interval between occurrences.
   * @param endCondition - The condition to end the recurrence.
   * @param exceptions - Array of TimePoints representing exceptions to the pattern.
   */
  constructor(
    public readonly frequency: RecurrenceFrequency,
    public readonly interval: number,
    public readonly endCondition: RecurrenceEndCondition,
    public readonly exceptions: TimePoint[] = []
  ) {}

  /**
   * Generates occurrences of the recurrence pattern within a given time range.
   * @param start - The start of the time range to generate occurrences for.
   * @param end - The end of the time range to generate occurrences for.
   * @returns An array of TimePoints representing the occurrences.
   */
  getOccurrences(start: TimePoint, end: TimePoint): TimePoint[] {
    // TODO: Implement this method
    // This is a placeholder implementation. The actual implementation would be more complex.
    return [];
  }
}