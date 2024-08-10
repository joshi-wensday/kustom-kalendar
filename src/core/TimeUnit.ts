/**
 * Represents a unit of time measurement in the Kustom Kalendar system.
 */
export class TimeUnit {
    /**
   * Creates a new TimeUnit instance.
   * @param id - Unique identifier for the time unit.
   * @param name - Human-readable name of the time unit.
   * @param symbol - Short symbol representing the time unit.
   * @param baseUnit - The base unit this unit is derived from, or null if this is a base unit.
   * @param conversionFactor - The factor to convert this unit to its base unit.
   * @param isDurationUnit - Whether this unit can be used to represent durations.
   */
    constructor(
      public readonly id: string,
      public readonly name: string,
      public readonly symbol: string,
      public readonly baseUnit: TimeUnit | null,
      public readonly conversionFactor: number,
      public readonly isDurationUnit: boolean
    ) {}
  
    /**
   * Converts a value from this unit to another unit.
   * @param value - The value to convert.
   * @param fromUnit - The unit to convert from.
   * @param toUnit - The unit to convert to.
   * @returns The converted value.
   */
  convert(value: number, fromUnit: TimeUnit, toUnit: TimeUnit): number {
    if (fromUnit === toUnit) {
      return value;
    }

    const fromBaseUnits = fromUnit.getAllBaseUnits();
    const toBaseUnits = toUnit.getAllBaseUnits();
    const commonBaseUnit = this.findCommonBaseUnit(fromBaseUnits, toBaseUnits);

    if (!commonBaseUnit) {
      throw new Error('Cannot convert between unrelated base units');
    }

    const valueInCommonBase = this.convertToBase(value, fromUnit, commonBaseUnit);
    return this.convertFromBase(valueInCommonBase, toUnit, commonBaseUnit);
  }

  /**
 * Gets all base units of this unit, including itself.
 * @returns An array of TimeUnits, starting with this unit and ending with the ultimate base unit.
 * @private
 */
  private getAllBaseUnits(): TimeUnit[] {
    const baseUnits: TimeUnit[] = [this];
    let currentUnit: TimeUnit | null = this;

    while (currentUnit.baseUnit !== null) {
      currentUnit = currentUnit.baseUnit;
      baseUnits.push(currentUnit);
    }

    return baseUnits;
  }

  /**
 * Finds a common base unit between two sets of units.
 * @param units1 - The first set of units.
 * @param units2 - The second set of units.
 * @returns The common base unit if found, null otherwise.
 * @private
 */
  private findCommonBaseUnit(units1: TimeUnit[], units2: TimeUnit[]): TimeUnit | null {
    for (const unit1 of units1) {
      if (units2.includes(unit1)) {
        return unit1;
      }
    }
    return null;
  }

  /**
 * Converts a value from a unit to a base unit.
 * @param value - The value to convert.
 * @param fromUnit - The unit to convert from.
 * @param baseUnit - The base unit to convert to.
 * @returns The converted value.
 * @private
 */
  private convertToBase(value: number, fromUnit: TimeUnit, baseUnit: TimeUnit): number {
    let result = value;
    let currentUnit = fromUnit;

    while (currentUnit !== baseUnit) {
      result *= currentUnit.conversionFactor;
      currentUnit = currentUnit.baseUnit!;
    }

    return result;
  }

  /**
 * Converts a value from a base unit to another unit.
 * @param value - The value to convert.
 * @param toUnit - The unit to convert to.
 * @param baseUnit - The base unit to convert from.
 * @returns The converted value.
 * @private
 */
  private convertFromBase(value: number, toUnit: TimeUnit, baseUnit: TimeUnit): number {
    let result = value;
    const conversionPath: TimeUnit[] = [];
    let currentUnit = toUnit;

    while (currentUnit !== baseUnit) {
      conversionPath.push(currentUnit);
      currentUnit = currentUnit.baseUnit!;
    }

    for (const unit of conversionPath.reverse()) {
      result /= unit.conversionFactor;
    }

    return result;
  }
}