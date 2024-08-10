import { TimePoint } from '../../src/core/TimePoint';
import { TimeUnit } from '../../src/core/TimeUnit';
import { Duration } from '../../src/core/Duration';
import { TimeSystem } from '../../src/core/TimeSystem';

describe('TimePoint', () => {
  let second: TimeUnit;
  let minute: TimeUnit;
  let timePoint: TimePoint;

  beforeEach(() => {
    second = TimePoint.SECOND;
    minute = new TimeUnit('minute', 'Minute', 'min', second, 60, true);
    timePoint = new TimePoint('tp1', 3600, second, 'UTC', 'Test Point');
  });

  it('should create a TimePoint instance', () => {
    expect(timePoint).toBeInstanceOf(TimePoint);
    expect(timePoint.id).toBe('tp1');
    expect(timePoint.value).toBe(3600);
    expect(timePoint.unit).toBe(second);
    expect(timePoint.timezone).toBe('UTC');
    expect(timePoint.name).toBe('Test Point');
  });

  it('should compare TimePoints correctly', () => {
    const earlier = new TimePoint('tp2', 3000, second, 'UTC');
    const later = new TimePoint('tp3', 4000, second, 'UTC');
    
    expect(timePoint.compare(earlier)).toBeGreaterThan(0);
    expect(timePoint.compare(later)).toBeLessThan(0);
    expect(timePoint.compare(timePoint)).toBe(0);
  });

  it('should add duration correctly', () => {
    const duration = new Duration(5, minute);
    const newPoint = timePoint.add(duration);
    
    expect(newPoint.value).toBe(3900);
    expect(newPoint.unit).toBe(second);
  });

  it('should subtract duration correctly', () => {
    const duration = new Duration(10, minute);
    const newPoint = timePoint.subtract(duration);
    
    expect(newPoint.value).toBe(3000);
    expect(newPoint.unit).toBe(second);
  });

  it('should convert to string correctly', () => {
    expect(timePoint.toString()).toBe('Test Point: 3600 seconds (UTC)');
  });
});