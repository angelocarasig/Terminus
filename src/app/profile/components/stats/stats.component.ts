import { Component, Input } from '@angular/core';
import { UserNovel } from '../../../shared/models/vn/user-novel';

@Component({
  selector: 'profile-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {
  @Input() ulist: Array<UserNovel> | null;
}
