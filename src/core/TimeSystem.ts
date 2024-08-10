// src/core/TimeSystem.ts

import { TimeUnit } from './TimeUnit';
import { TimePoint } from './TimePoint';
import { TimeEdge } from './TimeEdge';
import { CalendarRule } from './CalendarRule';
import { Event } from './Event';
import { TimeRange } from './TimeRange';
import { convertToTimezone } from '../utils/timezoneUtils';

/**
 * Represents a complete calendar system in the Kustom Kalendar.
 */
export class TimeSystem {
  private units: Map<string, TimeUnit> = new Map();
  private rules: Map<string, CalendarRule> = new Map();
  private events: Map<string, Event> = new Map();
  private points: Map<string, TimePoint> = new Map();
  private edges: Map<string, TimeEdge> = new Map();

  /**
   * Creates a new TimeSystem instance.
   * @param id - Unique identifier for the time system.
   * @param name - Name of the time system.
   * @param description - Description of the time system.
   * @param baseUnit - The base unit of time for this system.
   * @param universalReferencePoint - The reference point for universal time conversion.
   * @param primaryReferencePoint - The primary reference point for this time system.
   * @param baseTimezone - The base timezone for this time system.
   */
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly baseUnit: TimeUnit,
    public readonly universalReferencePoint: TimePoint = new TimePoint('universal_reference', 0, baseUnit, 'UTC'),
    public readonly primaryReferencePoint: TimePoint = new TimePoint('primary_reference', 0, baseUnit, 'UTC'),
    public readonly baseTimezone: string = 'UTC'
  ) {
    this.addUnit(baseUnit);
  }

  /**
   * Adds a time unit to the system.
   * @param unit - The TimeUnit to add.
   * @throws Error if a unit with the same id already exists.
   */
  addUnit(unit: TimeUnit): void {
    if (this.units.has(unit.id)) {
      throw new Error(`Unit with id ${unit.id} already exists in the system.`);
    }
    this.units.set(unit.id, unit);
  }

  /**
   * Removes a time unit from the system.
   * @param unitId - The id of the TimeUnit to remove.
   * @throws Error if the unit doesn't exist or is the base unit.
   */
  removeUnit(unitId: string): void {
    if (!this.units.has(unitId)) {
      throw new Error(`Unit with id ${unitId} does not exist in the system.`);
    }
    if (unitId === this.baseUnit.id) {
      throw new Error('Cannot remove the base unit of the system.');
    }
    this.units.delete(unitId);
  }

  /**
   * Retrieves a time unit from the system.
   * @param unitId - The id of the TimeUnit to retrieve.
   * @returns The TimeUnit if found, undefined otherwise.
   */
  getUnit(unitId: string): TimeUnit | undefined {
    return this.units.get(unitId);
  }

  /**
   * Adds a rule to the system.
   * @param rule - The CalendarRule to add.
   * @throws Error if a rule with the same id already exists.
   */
  addRule(rule: CalendarRule): void {
    if (this.rules.has(rule.id)) {
      throw new Error(`Rule with id ${rule.id} already exists in the system.`);
    }
    this.rules.set(rule.id, rule);
  }

  /**
   * Removes a rule from the system.
   * @param ruleId - The id of the CalendarRule to remove.
   * @throws Error if the rule doesn't exist.
   */
  removeRule(ruleId: string): void {
    if (!this.rules.has(ruleId)) {
      throw new Error(`Rule with id ${ruleId} does not exist in the system.`);
    }
    this.rules.delete(ruleId);
  }

  /**
   * Retrieves a rule from the system.
   * @param ruleId - The id of the CalendarRule to retrieve.
   * @returns The CalendarRule if found, undefined otherwise.
   */
  getRule(ruleId: string): CalendarRule | undefined {
    return this.rules.get(ruleId);
  }

  /**
   * Adds an event to the system.
   * @param event - The Event to add.
   * @throws Error if an event with the same id already exists.
   */
  addEvent(event: Event): void {
    if (this.events.has(event.id)) {
      throw new Error(`Event with id ${event.id} already exists in the system.`);
    }
    this.events.set(event.id, event);
  }

  /**
   * Removes an event from the system.
   * @param eventId - The id of the Event to remove.
   * @throws Error if the event doesn't exist.
   */
  removeEvent(eventId: string): void {
    if (!this.events.has(eventId)) {
      throw new Error(`Event with id ${eventId} does not exist in the system.`);
    }
    this.events.delete(eventId);
  }

  /**
   * Retrieves an event from the system.
   * @param eventId - The id of the Event to retrieve.
   * @returns The Event if found, undefined otherwise.
   */
  getEvent(eventId: string): Event | undefined {
    return this.events.get(eventId);
  }

  /**
   * Adds a time point to the system and updates chronological edges.
   * @param point - The TimePoint to add.
   * @throws Error if a point with the same id already exists.
   */
  addPoint(point: TimePoint): void {
    if (this.points.has(point.id)) {
      throw new Error(`Point with id ${point.id} already exists in the system.`);
    }
    this.points.set(point.id, point);
    this.updateChronologicalEdges(point);
  }

  /**
   * Removes a time point from the system.
   * @param pointId - The id of the TimePoint to remove.
   * @throws Error if the point doesn't exist.
   */
  removePoint(pointId: string): void {
    if (!this.points.has(pointId)) {
      throw new Error(`Point with id ${pointId} does not exist in the system.`);
    }
    this.points.delete(pointId);
    // TODO: Update chronological edges after removing a point
  }

  /**
   * Retrieves a time point from the system.
   * @param pointId - The id of the TimePoint to retrieve.
   * @returns The TimePoint if found, undefined otherwise.
   */
  getPoint(pointId: string): TimePoint | undefined {
    return this.points.get(pointId);
  }

  /**
   * Adds a time edge to the system.
   * @param edge - The TimeEdge to add.
   * @throws Error if an edge with the same id already exists or if the points don't exist.
   */
  addEdge(edge: TimeEdge): void {
    if (this.edges.has(edge.id)) {
      throw new Error(`Edge with id ${edge.id} already exists in the system.`);
    }
    if (!this.points.has(edge.fromPoint.id) || !this.points.has(edge.toPoint.id)) {
      throw new Error('Both fromPoint and toPoint must exist in the system before adding an edge.');
    }
    this.edges.set(edge.id, edge);
  }

  /**
   * Removes a time edge from the system.
   * @param edgeId - The id of the TimeEdge to remove.
   * @throws Error if the edge doesn't exist.
   */
  removeEdge(edgeId: string): void {
    if (!this.edges.has(edgeId)) {
      throw new Error(`Edge with id ${edgeId} does not exist in the system.`);
    }
    this.edges.delete(edgeId);
  }

  /**
   * Retrieves a time edge from the system.
   * @param edgeId - The id of the TimeEdge to retrieve.
   * @returns The TimeEdge if found, undefined otherwise.
   */
  getEdge(edgeId: string): TimeEdge | undefined {
    return this.edges.get(edgeId);
  }

  /**
   * Updates the chronological edges in the system after adding a new point.
   * @param newPoint - The newly added TimePoint.
   */
  updateChronologicalEdges(newPoint: TimePoint): void {
    // TODO: Update this to work for all types of chronological relationships/edges
    const sortedPoints = Array.from(this.points.values()).sort((a, b) => a.value - b.value);
    
    // Remove all existing chronological edges
    this.edges = new Map(Array.from(this.edges.entries()).filter(([, edge]) => edge.relationship !== 'next'));
  
    // Create new chronological edges
    for (let i = 0; i < sortedPoints.length - 1; i++) {
      const fromPoint = sortedPoints[i];
      const toPoint = sortedPoints[i + 1];
      const edgeId = `chrono_${fromPoint.id}_${toPoint.id}`;
      
      const newEdge = new TimeEdge(edgeId, fromPoint, toPoint, 'next');
      this.edges.set(edgeId, newEdge);
    }
  }

  /**
   * Retrieves all chronological edges in the system.
   * @returns An array of TimeEdges representing chronological relationships.
   */
  getChronologicalEdges(): TimeEdge[] {
    return Array.from(this.edges.values()).filter(edge => edge.relationship === 'next');
  }

  /**
   * Converts universal time to system time.
   * @param universalTime - The universal time to convert.
   * @returns The equivalent system time.
   */
  universalToSystemTime(universalTime: number): number {
    return universalTime - this.universalReferencePoint.value + this.primaryReferencePoint.value;
  }

  /**
   * Converts system time to universal time.
   * @param systemTime - The system time to convert.
   * @returns The equivalent universal time.
   */
  systemToUniversalTime(systemTime: number): number {
    return systemTime - this.primaryReferencePoint.value + this.universalReferencePoint.value;
  }

  /**
   * Applies all rules in the system to a given time point.
   * @param point - The TimePoint to apply rules to.
   */
  applyRules(point: TimePoint): void {
    this.rules.forEach(rule => {
      if (rule.evaluateCondition({ point })) {
        rule.executeAction({ point });
      }
    });
  }

  /**
   * Retrieves all events within a given time range.
   * @param range - The TimeRange to search within.
   * @returns An array of Events that occur within the given range.
   */
  getEventsInRange(range: TimeRange): Event[] {
    return Array.from(this.events.values()).filter(event => 
      event.timeRange.overlaps(range)
    );
  }

  /**
   * Retrieves all time points within a given time range.
   * @param range - The TimeRange to search within.
   * @returns An array of TimePoints that fall within the given range.
   */
  getPointsInRange(range: TimeRange): TimePoint[] {
    return Array.from(this.points.values()).filter(point => 
      range.contains(point)
    );
  }

  /**
   * Retrieves the chronological neighbors of a given time point.
   * @param point - The TimePoint to find neighbors for.
   * @returns An object containing the previous and next TimePoints, if they exist.
   * @throws Error if the point doesn't exist in the system.
   */
  getChronologicalNeighbors(point: TimePoint): { previous: TimePoint | null; next: TimePoint | null } {
    const sortedPoints = Array.from(this.points.values()).sort((a, b) => a.value - b.value);
    const index = sortedPoints.findIndex(p => p.id === point.id);

    if (index === -1) {
      throw new Error('The given point does not exist in this time system.');
    }

    return {
      previous: index > 0 ? sortedPoints[index - 1] : null,
      next: index < sortedPoints.length - 1 ? sortedPoints[index + 1] : null
    };
  }

  /**
   * Converts a TimePoint to a different timezone.
   * @param point - The TimePoint to convert.
   * @param targetTimezone - The timezone to convert to.
   * @returns A new TimePoint in the target timezone.
   */
  convertPointToTimezone(point: TimePoint, targetTimezone: string): TimePoint {
    return convertToTimezone(point, targetTimezone);
  }

  /**
   * Converts a TimeRange to a different timezone.
   * @param range - The TimeRange to convert.
   * @param targetTimezone - The timezone to convert to.
   * @returns A new TimeRange with both start and end points in the target timezone.
   */
  convertRangeToTimezone(range: TimeRange, targetTimezone: string): TimeRange {
    const convertedStart = this.convertPointToTimezone(range.start, targetTimezone);
    const convertedEnd = this.convertPointToTimezone(range.end, targetTimezone);
    return new TimeRange(convertedStart, convertedEnd);
  }

  // TODO: Implement timezone handling
  // TODO: Implement getChronologicalNeighbors() in TimePoint
}