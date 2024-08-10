// __tests__/core/TimeSystem.test.ts

import { TimeSystem } from '../../src/core/TimeSystem';
import { TimeUnit } from '../../src/core/TimeUnit';
import { TimePoint } from '../../src/core/TimePoint';
import { TimeEdge } from '../../src/core/TimeEdge';
import { CalendarRule } from '../../src/core/CalendarRule';
import { Event } from '../../src/core/Event';
import { TimeRange } from '../../src/core/TimeRange';

describe('TimeSystem', () => {
  let timeSystem: TimeSystem;
  let second: TimeUnit;
  let minute: TimeUnit;

  beforeEach(() => {
    second = new TimeUnit('second', 'Second', 's', null, 1, true);
    minute = new TimeUnit('minute', 'Minute', 'min', second, 60, true);
    timeSystem = new TimeSystem('system1', 'Test System', 'A test time system', second);
  });

  it('should create a TimeSystem instance', () => {
    expect(timeSystem).toBeInstanceOf(TimeSystem);
    expect(timeSystem.id).toBe('system1');
    expect(timeSystem.name).toBe('Test System');
    expect(timeSystem.description).toBe('A test time system');
    expect(timeSystem.baseUnit).toBe(second);
  });

  it('should add and remove units', () => {
    timeSystem.addUnit(minute);
    expect(timeSystem.getUnit('minute')).toBe(minute);

    timeSystem.removeUnit('minute');
    expect(timeSystem.getUnit('minute')).toBeUndefined();
  });

  it('should add and remove rules', () => {
    const rule = new CalendarRule('rule1', 'Test Rule', 'A test rule', () => true, () => {});
    timeSystem.addRule(rule);
    expect(timeSystem.getRule('rule1')).toBe(rule);

    timeSystem.removeRule('rule1');
    expect(timeSystem.getRule('rule1')).toBeUndefined();
  });

  it('should add and remove events', () => {
    const event = new Event('event1', 'Test Event', 'A test event', new TimeRange(
      new TimePoint('start', 0, second, 'UTC'),
      new TimePoint('end', 3600, second, 'UTC')
    ));
    timeSystem.addEvent(event);
    expect(timeSystem.getEvent('event1')).toBe(event);

    timeSystem.removeEvent('event1');
    expect(timeSystem.getEvent('event1')).toBeUndefined();
  });

  it('should add and remove points', () => {
    const point = new TimePoint('point1', 0, second, 'UTC');
    timeSystem.addPoint(point);
    expect(timeSystem.getPoint('point1')).toBe(point);

    timeSystem.removePoint('point1');
    expect(timeSystem.getPoint('point1')).toBeUndefined();
  });

  it('should add and remove edges', () => {
    const point1 = new TimePoint('point1', 0, second, 'UTC');
    const point2 = new TimePoint('point2', 60, second, 'UTC');
    const edge = new TimeEdge('edge1', point1, point2, 'next');
    
    timeSystem.addPoint(point1);
    timeSystem.addPoint(point2);
    timeSystem.addEdge(edge);
    expect(timeSystem.getEdge('edge1')).toBe(edge);

    timeSystem.removeEdge('edge1');
    expect(timeSystem.getEdge('edge1')).toBeUndefined();
  });

  it('should update chronological edges when adding a point', () => {
    const point1 = new TimePoint('point1', 0, second, 'UTC');
    const point2 = new TimePoint('point2', 60, second, 'UTC');
    const point3 = new TimePoint('point3', 30, second, 'UTC');

    timeSystem.addPoint(point1);
    timeSystem.addPoint(point2);
    timeSystem.addPoint(point3);

    const edges = timeSystem.getChronologicalEdges();
    expect(edges).toHaveLength(2);
    expect(edges[0].fromPoint).toBe(point1);
    expect(edges[0].toPoint).toBe(point3);
    expect(edges[1].fromPoint).toBe(point3);
    expect(edges[1].toPoint).toBe(point2);
  });

  it('should convert between universal time and system time', () => {
    const universalTime = 1000;
    const systemTime = timeSystem.universalToSystemTime(universalTime);
    expect(timeSystem.systemToUniversalTime(systemTime)).toBe(universalTime);
  });

  it('should apply rules to points', () => {
    const rule = new CalendarRule(
      'rule1',
      'Test Rule',
      'A test rule',
      (context) => context.point.value % 2 === 0,
      (context) => { context.point.metadata['isEven'] = true; }
    );
    timeSystem.addRule(rule);

    const point1 = new TimePoint('point1', 2, second, 'UTC');
    const point2 = new TimePoint('point2', 3, second, 'UTC');

    timeSystem.applyRules(point1);
    timeSystem.applyRules(point2);

    expect(point1.metadata['isEven']).toBe(true);
    expect(point2.metadata['isEven']).toBeUndefined();
  });

  describe('getChronologicalNeighbors', () => {
    it('should return correct chronological neighbors', () => {
      const point1 = new TimePoint('point1', 0, second, 'UTC');
      const point2 = new TimePoint('point2', 1, second, 'UTC');
      const point3 = new TimePoint('point3', 2, second, 'UTC');
  
      timeSystem.addPoint(point1);
      timeSystem.addPoint(point2);
      timeSystem.addPoint(point3);
  
      const neighbors = timeSystem.getChronologicalNeighbors(point2);
      expect(neighbors.previous).toBe(point1);
      expect(neighbors.next).toBe(point3);
    });
  
    it('should throw an error for a point not in the system', () => {
      const outsidePoint = new TimePoint('outside', 100, second, 'UTC');
      expect(() => timeSystem.getChronologicalNeighbors(outsidePoint)).toThrow();
    });
  });

  describe('timezone conversion', () => {
    let timeSystem: TimeSystem;
    let second: TimeUnit;

    beforeEach(() => {
      second = new TimeUnit('second', 'Second', 's', null, 1, true);
      timeSystem = new TimeSystem('system1', 'Test System', 'A test time system', second);
    });

    it('should convert a TimePoint to a different timezone', () => {
      const point = new TimePoint('point1', 1609459200, second, 'UTC'); // 2021-01-01 00:00:00 UTC
      const convertedPoint = timeSystem.convertPointToTimezone(point, 'America/New_York');

      expect(convertedPoint.timezone).toBe('America/New_York');
      expect(convertedPoint.value).toBe(1609459200 - 5 * 3600); // 5 hours earlier
    });

    it('should convert a TimeRange to a different timezone', () => {
      const start = new TimePoint('start', 1609459200, second, 'UTC'); // 2021-01-01 00:00:00 UTC
      const end = new TimePoint('end', 1609545600, second, 'UTC'); // 2021-01-02 00:00:00 UTC
      const range = new TimeRange(start, end);

      const convertedRange = timeSystem.convertRangeToTimezone(range, 'America/New_York');

      expect(convertedRange.start.timezone).toBe('America/New_York');
      expect(convertedRange.end.timezone).toBe('America/New_York');
      expect(convertedRange.start.value).toBe(1609459200 - 5 * 3600);
      expect(convertedRange.end.value).toBe(1609545600 - 5 * 3600);
    });
  });
});