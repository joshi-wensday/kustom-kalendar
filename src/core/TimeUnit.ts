// src/core/TimeUnit.ts

/**
 * Represents the type of a time unit, categorizing it by scale.
 */
export enum TimeUnitType {
    SubSecond,
    Second,
    SubDay,
    Day,
    SubYear,
    Year,
    MultiYear
  }
  
  /**
   * Represents a unit of time in a calendar system.
   */
  export class TimeUnit {
    /** The base second unit, used for conversions */
    static SECOND: TimeUnit;
  
    private _name: string;
    private _duration: number;
    private _baseUnit: TimeUnit | null;
    private _type: TimeUnitType;
    private _childUnits: TimeUnit[] = [];
  
    /**
     * Creates a new TimeUnit instance.
     * @param name - The name of the time unit.
     * @param duration - The duration of this unit in terms of its base unit.
     * @param baseUnit - The base unit for this time unit, or null if it's a base unit itself.
     * @param type - The type of this time unit.
     */
    constructor(name: string, duration: number, baseUnit: TimeUnit | null, type: TimeUnitType) {
      this._name = name;
      this._duration = duration;
      this._baseUnit = baseUnit;
      this._type = type;
  
      if (baseUnit) {
        baseUnit.addChildUnit(this);
      }
  
      // If this is a second unit and we haven't set the static SECOND yet, set it
      if (type === TimeUnitType.Second && !TimeUnit.SECOND) {
        TimeUnit.SECOND = this;
      }
    }
  
    get name(): string {
        return this._name;
      }
    
      get duration(): number {
        return this._duration;
      }
    
      get baseUnit(): TimeUnit | null {
        return this._baseUnit;
      }
    
      get type(): TimeUnitType {
        return this._type;
      }
    
      get childUnits(): TimeUnit[] {
        return [...this._childUnits];
      }
  
    /**
     * Adds a child unit to this unit.
     * @param unit - The child unit to add.
     */
    addChildUnit(unit: TimeUnit): void {
      if (!this._childUnits.includes(unit)) {
        this._childUnits.push(unit);
      }
    }
  
    /**
     * Removes a child unit from this unit.
     * @param unit - The child unit to remove.
     */
    removeChildUnit(unit: TimeUnit): void {
      const index = this._childUnits.indexOf(unit);
      if (index !== -1) {
        this._childUnits.splice(index, 1);
      }
    }
  
    /**
     * Returns the duration and unit name of this time unit.
     * @returns An object containing the duration and unit name.
     */
    time(): { duration: number; unit: string } {
      return { duration: this._duration, unit: this._baseUnit ? this._baseUnit.name : 'base' };
    }
  
    /**
     * Converts an amount from this unit to the base unit (seconds).
     * @param amount - The amount to convert.
     * @returns The equivalent amount in the base unit.
     */
    toBaseUnit(amount: number): number {
      let baseAmount = amount * this._duration;
      let currentUnit: TimeUnit | null = this._baseUnit;
  
      // Traverse up the unit hierarchy until we reach the base unit (seconds)
      while (currentUnit && currentUnit !== TimeUnit.SECOND) {
        baseAmount *= currentUnit._duration;
        currentUnit = currentUnit._baseUnit;
      }
  
      return baseAmount;
    }
  
    /**
     * Converts an amount from the base unit (seconds) to this unit.
     * @param amount - The amount in the base unit to convert.
     * @returns The equivalent amount in this unit.
     */
    fromBaseUnit(amount: number): number {
      let unitAmount = amount;
      let currentUnit: TimeUnit | null = this;
  
      // Traverse down the unit hierarchy from seconds to this unit
      while (currentUnit && currentUnit !== TimeUnit.SECOND) {
        unitAmount /= currentUnit._duration;
        currentUnit = currentUnit._baseUnit;
      }
  
      return unitAmount;
    }
  
    /**
     * Converts an amount from this unit to another unit.
     * @param amount - The amount to convert.
     * @param targetUnit - The unit to convert to.
     * @returns The equivalent amount in the target unit, or null if conversion is impossible.
     */
    convertTo(amount: number, targetUnit: TimeUnit): number | null {
      const baseAmount = this.toBaseUnit(amount);
      return targetUnit.fromBaseUnit(baseAmount);
    }
  }
  
  // Initialize the SECOND TimeUnit
  TimeUnit.SECOND = new TimeUnit('second', 1, null, TimeUnitType.Second);