// src/core/Event.ts

import { TimeRange } from './TimeRange';
import { RecurrencePattern } from './RecurrencePattern';

/**
 * Represents an event in the Kustom Kalendar system.
 */
export class Event {
  /**
   * Predefined categories for events.
   */
  static readonly PredefinedCategories = {
    UNCATEGORIZED: 'uncategorized',
    HOLIDAY: 'holiday',
    THEME: 'theme',
    INTENTION: 'intention',
    ASTRONOMICAL_EVENT: 'astronomicalEvent',
    EARTH_EVENT: 'earthEvent',
    LUNAR_EVENT: 'lunarEvent'
  };

  /**
   * Creates a new Event instance.
   * @param id - Unique identifier for the event.
   * @param title - Title of the event.
   * @param description - Description of the event.
   * @param timeRange - The TimeRange during which the event occurs.
   * @param category - Category of the event, defaults to UNCATEGORIZED.
   * @param recurrence - RecurrencePattern for recurring events, or null for non-recurring events.
   * @param metadata - Additional metadata for the event, defaults to an empty object.
   */
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly timeRange: TimeRange,
    public readonly category: string = Event.PredefinedCategories.UNCATEGORIZED,
    public readonly recurrence: RecurrencePattern | null = null,
    public readonly metadata: Record<string, unknown> = {}
  ) {}
}