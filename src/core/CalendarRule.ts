// src/core/CalendarRule.ts

import { TimePoint } from './TimePoint';

export interface CalendarRuleContext {
  point: TimePoint;
  // Add other relevant context properties as needed
}

/**
 * Represents a rule in the Kustom Kalendar system that can be applied to TimePoints.
 */
export class CalendarRule {
  /**
   * Creates a new CalendarRule instance.
   * @param id - Unique identifier for the rule.
   * @param name - Name of the rule.
   * @param description - Description of the rule.
   * @param condition - Function that determines if the rule should be applied.
   * @param action - Function that executes when the rule is applied.
   */
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    private readonly condition: (context: CalendarRuleContext) => boolean,
    private readonly action: (context: CalendarRuleContext) => void
  ) {}

  /**
   * Evaluates the condition of the rule for a given context.
   * @param context - The context in which to evaluate the rule.
   * @returns True if the condition is met, false otherwise.
   */
  evaluateCondition(context: CalendarRuleContext): boolean {
    return this.condition(context);
  }

  /**
   * Executes the action of the rule for a given context.
   * @param context - The context in which to execute the rule.
   */
  executeAction(context: CalendarRuleContext): void {
    this.action(context);
  }
}