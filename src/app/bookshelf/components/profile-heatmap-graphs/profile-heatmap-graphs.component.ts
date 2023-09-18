import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserNovel } from '../../../shared/models/vn/user-novel';
import { weekdayDate } from '../../../shared/helpers/utilities.helper';

@Component({
  selector: 'app-profile-heatmap-graphs',
  templateUrl: './profile-heatmap-graphs.component.html',
  styleUrls: ['./profile-heatmap-graphs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileHeatmapGraphsComponent {
  @Input() ulist: UserNovel[] | null;
  heatmapData: Array<any>;

  ngOnInit() {
    if (this.ulist == null) return;

    this.getHeatmapData();
  }

  getLast15WeeksDates(): Date[][] {
    const today = new Date();
    today.setDate(today.getDate() + 7);
    return Array.from({ length: 7 }, (_, dayOfWeek) => {
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - (today.getDay() - 1) - (7 - dayOfWeek));

      return Array.from({ length: 15 }, (_, week) => {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() - (week * 7));
        return date;
      }).reverse();
    });
  }

  isSameDay(d1: Date, d2: Date): boolean {
    return d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear();
  }

  getHeatmapData(): void {
    const dates = this.getLast15WeeksDates();
    this.heatmapData = dates.map(week => {
      return week.map(date => {
        const novelsForDay = this.ulist?.filter(novel => {
          const added = new Date(novel.addedFormatted || '');
          const modified = new Date(novel.lastmodFormatted || '');
          const voted = new Date(novel.votedFormatted || '');

          return this.isSameDay(added, date) || this.isSameDay(modified, date) || this.isSameDay(voted, date);
        });
        return { date: date, novels: novelsForDay || [] };
      });
    });

    console.log(this.heatmapData);
  }

  getColorLevel(length: number): string {
    if (length > 900) return `var(--green-900)`;
    return `var(--green-${length}00)`;
  }

  getCurrentWeekStyling(date: Date): string {
    const currentDate = new Date();

    if (this.isSameDay(currentDate, date)) {
      return 'current-date';
    }

    return currentDate > date ? '' : 'unpassed-date';
  }

  getWeekdayLabel(dayIndex: number): string {
    if (dayIndex % 2 !== 0) return '';
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return weekdays[dayIndex];
  }

  getWeekLabel(weekIndex: number): string {
    for (let rowIndex = 0; rowIndex < this.heatmapData.length; rowIndex++) {
      const date = this.heatmapData[rowIndex][weekIndex].date;
      if (date.getDate() === 7) {
        return date.toLocaleString('default', { month: 'short' });
      }
    }
    return '';
  }

  protected readonly weekdayDate = weekdayDate;
}
