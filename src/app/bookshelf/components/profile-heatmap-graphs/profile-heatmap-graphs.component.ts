import { Component, Input } from '@angular/core';
import { UserNovel } from '../../../shared/models/vn/user-novel';

@Component({
  selector: 'app-profile-heatmap-graphs',
  templateUrl: './profile-heatmap-graphs.component.html',
  styleUrls: ['./profile-heatmap-graphs.component.scss']
})
export class ProfileHeatmapGraphsComponent {
  @Input() ulist: UserNovel[] | null;
  heatmapData: Array<any>;

  ngOnInit() {
    if (this.ulist == null) return;

    this.getHeatmapData();
  }

  getLast15WeekDates(): Date[][] {
    const dates = [];
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set to start of day

    for (let i = 0; i < 7; i++) {
      const weekDates = [];
      for (let j = 0; j < 15; j++) {
        weekDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() - 7);
      }
      dates.push(weekDates.reverse());
      currentDate.setDate(currentDate.getDate() + 105 - 1);
    }

    return dates;
  }

  isSameDay(d1: Date, d2: Date): boolean {
    return d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear();
  }

  getHeatmapData(): void {
    const dates = this.getLast15WeekDates();
    this.heatmapData = dates.map(week => {
      return week.map(date => {
        const novelsForDay = this.ulist?.filter(novel => {
          const added = new Date(novel.addedFormatted || '');
          const modified = new Date(novel.lastmodFormatted || '');
          const voted = new Date(novel.votedFormatted || '');

          return this.isSameDay(added, date) || this.isSameDay(modified, date) || this.isSameDay(voted, date);
        });
        return { date, novels: novelsForDay || [] };
      });
    });
  }

  getColorLevel(length: number): string {
    if (length > 900) return `var(--green-900)`;
    return `var(--green-${length}00)`;
  }
}
