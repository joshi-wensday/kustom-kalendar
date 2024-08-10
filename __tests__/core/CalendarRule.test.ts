// __tests__/core/CalendarRule.test.ts

import { CalendarRule } from '../../src/core/CalendarRule';
import { TimePoint } from '../../src/core/TimePoint';

describe('CalendarRule', () => {
  let rule: CalendarRule;

  beforeEach(() => {
    rule = new CalendarRule(
      'rule1',
      'Test Rule',
      'This is a test rule',
      (context) => context.point.value % 2 === 0,
      (context) => { context.point.metadata['isEven'] = true; }
    );
  });

  it('should create a CalendarRule instance', () => {
    expect(rule).toBeInstanceOf(CalendarRule);
    expect(rule.id).toBe('rule1');
    expect(rule.name).toBe('Test Rule');
    expect(rule.description).toBe('This is a test rule');
  });

  it('should evaluate condition correctly', () => {
    const evenPoint = new TimePoint('even', 2, TimePoint.SECOND, 'UTC');
    const oddPoint = new TimePoint('odd', 3, TimePoint.SECOND, 'UTC');

    expect(rule.evaluateCondition({ point: evenPoint })).toBe(true);
    expect(rule.evaluateCondition({ point: oddPoint })).toBe(false);
  });

  it('should execute action correctly', () => {
    const point = new TimePoint('even', 2, TimePoint.SECOND, 'UTC');
    rule.executeAction({ point });

    expect(point.metadata['isEven']).toBe(true);
  });
});