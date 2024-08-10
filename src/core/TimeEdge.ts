// src/core/TimeEdge.ts

import { TimePoint } from './TimePoint';

/**
 * Represents a directional relationship between two TimePoints in the Kustom Kalendar system.
 */
export class TimeEdge {
    /**
   * Creates a new TimeEdge instance.
   * @param id - Unique identifier for the time edge.
   * @param fromPoint - The starting TimePoint of the edge.
   * @param toPoint - The ending TimePoint of the edge.
   * @param relationship - The type of relationship between the points.
   * @param weight - Optional weight of the edge, defaults to 1.
   */
  constructor(
    public readonly id: string,
    public readonly fromPoint: TimePoint,
    public readonly toPoint: TimePoint,
    public readonly relationship: string,
    public readonly weight: number = 1
  ) {}

  /**
   * Checks if this TimeEdge is a duplicate of another TimeEdge.
   * Two edges are considered duplicates if they have the same fromPoint, toPoint, and relationship,
   * but different IDs.
   * @param other - The other TimeEdge to compare with.
   * @returns True if the edges are duplicates, false otherwise.
   */
  isDuplicate(other: TimeEdge): boolean {
    return this.id !== other.id && 
           this.fromPoint === other.fromPoint &&
           this.toPoint === other.toPoint &&
           this.relationship === other.relationship;
  }
}