import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { UserNovel } from '../../../shared/models/vn/user-novel';
import { weekdayDate } from '../../../shared/helpers/utilities.helper';

interface dayModifyStat {
  [key: string]: Array<UserNovel>;
  voted: Array<UserNovel>;
  added: Array<UserNovel>;
  modified: Array<UserNovel>;
}

interface heatmapCell {
  novels: Array<UserNovel>;
  dayStats: dayModifyStat;
  date: Date;
}

type StatusKeys = 'added' | 'voted' | 'modified';

@Component({
  selector: 'profile-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeatmapComponent {
  @Input() ulist: UserNovel[] | null;
  heatmapData: Array<Array<heatmapCell>>;

  currentCell: heatmapCell;

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (this.ulist == null) return;

    this.currentCell = {
      novels: [],
      dayStats: {
        voted: [],
        added: [],
        modified: [],
      },
      date: new Date()
    }

    this.getHeatmapData();
  }

  private getLast15WeeksDates(): Date[][] {
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

  private isSameDay(d1: Date, d2: Date): boolean {
    return d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear();
  }

  private getHeatmapData(): void {
    const dates = this.getLast15WeeksDates();

    this.heatmapData = dates.map(week => {
      return week.map(date => {
        let dayStats: dayModifyStat = { voted: [], added: [], modified: [] };

        const novelsForDay = this.ulist?.filter(novel => {
          const added = new Date(novel.addedFormatted || '');
          const modified = new Date(novel.lastmodFormatted || '');
          const voted = new Date(novel.votedFormatted || '');

          const addedSameDay = this.isSameDay(added, date);
          const modifiedSameDay = this.isSameDay(modified, date);
          const votedSameDay = this.isSameDay(voted, date);

          let addedOrVoted = false;

          if (addedSameDay) {
            dayStats.added.push(novel);
            addedOrVoted = true;
          }

          if (votedSameDay) {
            dayStats.voted.push(novel);
            addedOrVoted = true;
          }

          if (modifiedSameDay && !addedOrVoted) dayStats.modified.push(novel);

          return addedSameDay || modifiedSameDay || votedSameDay;
        });

        return { date: date, novels: novelsForDay || [], dayStats: dayStats };
      });
    });
  }

  getColorLevel(length: number): string {
    if (length > 400) return `var(--green-400)`;
    return `var(--green-${length}00)`;
  }

  getCurrentWeekStyling(date: Date): boolean {
    return new Date() < date;
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

  toggleCurrentHeatmapCell(cell: heatmapCell): void {
    this.currentCell = cell;
  }

  getNovelHeatmapStatus(novel: UserNovel): string {
    const statusMap: Record<StatusKeys, string> = {
      added: "Added",
      voted: "Voted",
      modified: "Modified"
    };

    for (const status in statusMap) {
      if (statusMap.hasOwnProperty(status) && this.currentCell.dayStats[status as StatusKeys].includes(novel)) {
        return statusMap[status as StatusKeys];
      }
    }

    throw new Error(`Could not find where novel ${novel.vn.title} belongs to.`);
  }

  goToPage(novel: UserNovel): void {
    this.router.navigate(['/vn'], { state: { novel: novel } });
  }

  protected readonly weekdayDate = weekdayDate;
}
