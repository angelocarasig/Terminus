import { HeatmapEntry } from '../../../types';
import { unixTimestampToDate } from './utilities.helper';
import { format } from 'date-fns';
import { MONTHS } from '../../../constants';

export function convertToHeatmap(userNovelList: Array<any>): HeatmapEntry[] {
  const entries = userNovelList.map(userNovel => ({date: unixTimestampToDate(userNovel.added),frequency: 1}));

  const heatmapMap: Map<string, Map<string, number>> = new Map();
  const months = MONTHS;

  let minYear: number | null = null;
  let maxYear: number | null = null;

  entries.forEach((entry) => {
    const year = entry.date.getFullYear();

    if (minYear === null || year < minYear) {
      minYear = year;
    }
    if (maxYear === null || year > maxYear) {
      maxYear = year;
    }

    const currentMonth = format(entry.date, 'MMMM');
    if (!heatmapMap.has(currentMonth)) {
      heatmapMap.set(currentMonth, new Map());
    }

    const monthMap = heatmapMap.get(currentMonth)!;
    if (!monthMap.has(year.toString())) {
      monthMap.set(year.toString(), 0);
    }

    monthMap.set(year.toString(), monthMap.get(year.toString())! + entry.frequency);
  });

  const heatmapEntries: HeatmapEntry[] = [];

  months.forEach((monthName) => {
    const monthMap = heatmapMap.get(monthName);

    // Create an array to store data for each year, with padding
    const data: Array<{ x: string; y: number }> = [];

    // Iterate through the years within the range
    for (let year = minYear!; year <= maxYear!; year++) {
      const frequency = monthMap?.get(year.toString()) || 0;
      data.push({ x: year.toString(), y: frequency });
    }

    // Add the heatmap entry to the result array
    heatmapEntries.push({
      name: monthName,
      data
    });
  });

  // Reverse the heatmap entries to have the earliest month first
  return heatmapEntries.reverse();
}
