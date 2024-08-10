// src/utils/timeUtils.ts

import { TimePoint } from '../core/TimePoint';
import { TimeUnit } from '../core/TimeUnit';
import moment from 'moment-timezone';

export function convertToTimezone(point: TimePoint, targetTimezone: string): TimePoint {
  const momentDate = moment.tz(point.value * 1000, point.timezone);
  const convertedDate = momentDate.tz(targetTimezone);
  const diffInSeconds = (convertedDate.valueOf() - momentDate.valueOf()) / 1000;
  
  const convertedValue = point.value - diffInSeconds; // Subtract the difference
  
  return new TimePoint(
    `${point.id}_${targetTimezone}`,
    convertedValue,
    point.unit,
    targetTimezone,
    point.name
  );
}

export function convertToUnit(point: TimePoint, targetUnit: TimeUnit): TimePoint {
  const convertedValue = point.unit.convert(point.value, point.unit, targetUnit);
  
  return new TimePoint(
    `${point.id}_${targetUnit.id}`,
    convertedValue,
    targetUnit,
    point.timezone,
    point.name
  );
}