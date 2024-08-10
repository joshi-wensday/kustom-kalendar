// __tests__/core/Duration.test.ts

import { Duration } from '../../src/core/Duration';
import { TimeUnit } from '../../src/core/TimeUnit';

describe('Duration', () => {
  let second: TimeUnit;

  beforeEach(() => {
    second = new TimeUnit('second', 'Second', 's', null, 1, true);
  });

  it('should create a Duration instance', () => {
    const duration = new Duration(5, second);
    expect(duration).toBeInstanceOf(Duration);
    expect(duration.value).toBe(5);
    expect(duration.unit).toBe(second);
  });

  it('should convert duration to base unit', () => {
    const minute = new TimeUnit('minute', 'Minute', 'min', second, 60, true);
    const duration = new Duration(5, minute);
    expect(duration.toBaseUnit().value).toBe(300);
    expect(duration.toBaseUnit().unit).toBe(second);
  });
});