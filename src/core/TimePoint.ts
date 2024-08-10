import { TimeUnit } from './TimeUnit';
import { Duration } from './Duration';

/**
 * Represents a specific point in time in the Kustom Kalendar system.
 */
export class TimePoint {
  static readonly SECOND = new TimeUnit('second', 'Second', 's', null, 1, true);
  /**
   * Creates a new TimePoint instance.
   * @param id - Unique identifier for the time point.
   * @param value - The numeric value of the time point.
   * @param unit - The TimeUnit of the time point.
   * @param timezone - The timezone of the time point.
   * @param name - Optional name for the time point.
   * @param metadata - Optional additional data associated with the time point.
   */
  constructor(
    public readonly id: string,
    public readonly value: number,
    public readonly unit: TimeUnit,
    public readonly timezone: string,
    public readonly name?: string,
    public readonly metadata: Record<string, unknown> = {}
  ) {}

  /**
   * Compares this TimePoint to another TimePoint.
   * @param other - The TimePoint to compare to.
   * @returns A number less than 0 if this TimePoint is earlier, 0 if they are the same, or a number greater than 0 if this TimePoint is later.
   */
  compare(other: TimePoint): number {
    const thisBaseValue = this.unit.convert(this.value, this.unit, this.unit.baseUnit ?? this.unit);
    const otherBaseValue = other.unit.convert(other.value, other.unit, other.unit.baseUnit ?? other.unit);
    return thisBaseValue - otherBaseValue;
  }

  /**
   * Adds a Duration to this TimePoint.
   * @param duration - The Duration to add.
   * @returns A new TimePoint representing the result of the addition.
   */
  add(duration: Duration): TimePoint {
    const durationInThisUnit = duration.unit.convert(duration.value, duration.unit, this.unit);
    return new TimePoint(
      `${this.id}_added`,
      this.value + durationInThisUnit,
      this.unit,
      this.timezone,
      this.name
    );
  }

  /**
   * Subtracts a Duration from this TimePoint.
   * @param duration - The Duration to subtract.
   * @returns A new TimePoint representing the result of the subtraction.
   */
  subtract(duration: Duration): TimePoint {
    const durationInThisUnit = duration.unit.convert(duration.value, duration.unit, this.unit);
    return new TimePoint(
      `${this.id}_subtracted`,
      this.value - durationInThisUnit,
      this.unit,
      this.timezone,
      this.name
    );
  }

  /**
   * Converts the TimePoint to a string representation.
   * @returns A string representation of the TimePoint.
   */
  toString(): string {
    return `${this.name ?? this.id}: ${this.value} ${this.unit.name.toLowerCase()}s (${this.timezone})`;
  }

}