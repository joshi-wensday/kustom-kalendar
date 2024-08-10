import { TimeUnit } from '../../src/core/TimeUnit';

describe('TimeUnit', () => {
  let second: TimeUnit;
  let minute: TimeUnit;
  let hour: TimeUnit;

  beforeEach(() => {
    second = new TimeUnit('second', 'Second', 's', null, 1, true);
    minute = new TimeUnit('minute', 'Minute', 'min', second, 60, true);
    hour = new TimeUnit('hour', 'Hour', 'h', second, 3600, true);
  });

  it('should create a TimeUnit instance', () => {
    expect(second).toBeInstanceOf(TimeUnit);
    expect(second.id).toBe('second');
    expect(second.name).toBe('Second');
    expect(second.symbol).toBe('s');
    expect(second.baseUnit).toBeNull();
    expect(second.conversionFactor).toBe(1);
    expect(second.isDurationUnit).toBe(true);
  });

  it('should convert between units correctly', () => {
    expect(minute.convert(1, minute, second)).toBe(60);
    expect(hour.convert(1, hour, second)).toBe(3600);
    expect(second.convert(3600, second, hour)).toBe(1);
    expect(minute.convert(60, minute, hour)).toBe(1);
  });

  describe('convert', () => {
    let day: TimeUnit;

    beforeEach(() => {
      day = new TimeUnit('day', 'Day', 'd', hour, 24, true);
    });

    it('should convert between units with a common base ancestor', () => {
      expect(day.convert(1, day, second)).toBe(86400);
      expect(day.convert(86400, second, day)).toBe(1);
      expect(hour.convert(1, hour, minute)).toBe(60);
      expect(hour.convert(120, minute, hour)).toBe(2);
    });

    it('should throw an error when converting between unrelated units', () => {
      const unrelatedUnit = new TimeUnit('unrelated', 'Unrelated', 'u', null, 1, true);
      expect(() => day.convert(1, day, unrelatedUnit)).toThrow('Cannot convert between unrelated base units');
    });
  });
});