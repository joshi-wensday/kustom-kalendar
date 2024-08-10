// src/core/Duration.ts

import { TimeUnit } from './TimeUnit';

/**
 * Represents a duration of time in the Kustom Kalendar system.
 */
export class Duration {
  /**
   * Creates a new Duration instance.
   * @param value - The numeric value of the duration.
   * @param unit - The TimeUnit of the duration.
   */
  constructor(
    public readonly value: number,
    public readonly unit: TimeUnit
  ) {}

  /**
   * Converts the duration to its base unit.
   * @returns A new Duration instance in the base unit.
   */
  toBaseUnit(): Duration {
    if (this.unit.baseUnit === null) {
      return this;
    }
    return new Duration(this.value * this.unit.conversionFactor, this.unit.baseUnit);
  }
}