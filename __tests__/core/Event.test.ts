// __tests__/core/Event.test.ts

import { Event } from '../../src/core/Event';
import { TimeRange } from '../../src/core/TimeRange';
import { TimePoint } from '../../src/core/TimePoint';
import { RecurrencePattern, RecurrenceFrequency } from '../../src/core/RecurrencePattern';

describe('Event', () => {
  let timeRange: TimeRange;
  let event: Event;
  let recurrencePattern: RecurrencePattern;

  beforeEach(() => {
    const start = new TimePoint('start', 0, TimePoint.SECOND, 'UTC');
    const end = new TimePoint('end', 3600, TimePoint.SECOND, 'UTC');
    timeRange = new TimeRange(start, end);
    recurrencePattern = new RecurrencePattern(
      RecurrenceFrequency.WEEKLY,
      1,
      { type: 'count', value: 10 }
    );
    event = new Event('event1', 'Test Event', 'This is a test event', timeRange);
  });

  it('should create an Event instance', () => {
    expect(event).toBeInstanceOf(Event);
    expect(event.id).toBe('event1');
    expect(event.title).toBe('Test Event');
    expect(event.description).toBe('This is a test event');
    expect(event.timeRange).toBe(timeRange);
    expect(event.category).toBe(Event.PredefinedCategories.UNCATEGORIZED);
    expect(event.metadata).toEqual({});
    expect(event.recurrence).toBeNull();
  });

  it('should create an Event instance with a custom category', () => {
    const customEvent = new Event('event2', 'Custom Event', 'This is a custom event', timeRange, Event.PredefinedCategories.HOLIDAY);
    expect(customEvent.category).toBe(Event.PredefinedCategories.HOLIDAY);
  });

  it('should create an Event instance with custom metadata', () => {
    const customEvent = new Event('event3', 'Metadata Event', 'This event has metadata', timeRange, Event.PredefinedCategories.UNCATEGORIZED, null, { priority: 'high' });
    expect(customEvent.metadata).toEqual({ priority: 'high' });
  });

  it('should have correct predefined categories', () => {
    expect(Event.PredefinedCategories).toEqual({
      UNCATEGORIZED: 'uncategorized',
      HOLIDAY: 'holiday',
      THEME: 'theme',
      INTENTION: 'intention',
      ASTRONOMICAL_EVENT: 'astronomicalEvent',
      EARTH_EVENT: 'earthEvent',
      LUNAR_EVENT: 'lunarEvent'
    });
  });

  it('should create an Event instance with a recurrence pattern', () => {
    const eventWithRecurrence = new Event('event4', 'Recurring Event', 'This event recurs', timeRange, Event.PredefinedCategories.UNCATEGORIZED, recurrencePattern);
    
    expect(eventWithRecurrence.recurrence).toBe(recurrencePattern);
  });

  it('should create an Event instance without a recurrence pattern', () => {
    expect(event.recurrence).toBeNull();
  });

});