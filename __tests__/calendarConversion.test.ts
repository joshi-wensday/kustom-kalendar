// __tests__/calendarConversion.test.ts

import { convertBetweenCalendars } from '../src/utils/calendarConversion';
import { GregorianKalendar } from '../src/kalendars/GregorianKalendar';
import { WhensdayKalendar } from '../src/kalendars/WhensdayKalendar';

describe('Calendar Conversion', () => {
  let gregorian: GregorianKalendar;
  let whensday: WhensdayKalendar;

  beforeEach(() => {
    gregorian = new GregorianKalendar();
    whensday = new WhensdayKalendar();
  });

  test('converts from Gregorian to Whensday correctly', () => {
    const gregorianDate = { year: 2024, month: 1, day: 1 };
    const whensdayDate = convertBetweenCalendars(gregorian, whensday, gregorianDate);
    expect(whensdayDate).toEqual({ year: 2024, month: 0, day: 1 }); // Weensday
  });

  test('converts from Whensday to Gregorian correctly', () => {
    const whensdayDate = { year: 2024, month: 0, day: 1 }; // Weensday
    const gregorianDate = convertBetweenCalendars(whensday, gregorian, whensdayDate);
    expect(gregorianDate).toEqual({ year: 2024, month: 1, day: 1 });
  });

  test('handles leap years correctly', () => {
    const gregorianLeapDay = { year: 2024, month: 2, day: 29 };
    const whensdayDate = convertBetweenCalendars(gregorian, whensday, gregorianLeapDay);
    expect(whensdayDate).toEqual({ year: 2024, month: 3, day: 3 });

    const whensdayLeapDay = { year: 2024, month: 7, day: 15 };
    const gregorianDate = convertBetweenCalendars(whensday, gregorian, whensdayLeapDay);
    expect(gregorianDate).toEqual({ year: 2024, month: 7, day: 2 });
  });

  test('converts between years correctly', () => {
    const gregorianNewYear = { year: 2025, month: 1, day: 1 };
    const whensdayNewYear = convertBetweenCalendars(gregorian, whensday, gregorianNewYear);
    expect(whensdayNewYear).toEqual({ year: 2025, month: 1, day: 1 });
  });

  // Add more tests for edge cases and different date ranges
});