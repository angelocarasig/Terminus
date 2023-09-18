import { Component, Input } from '@angular/core';
import { UserNovel } from '../../../shared/models/vn/user-novel';

@Component({
  selector: 'app-profile-stats-graphs',
  templateUrl: './profile-stats-graphs.component.html',
  styleUrls: ['./profile-stats-graphs.component.scss']
})
export class ProfileStatsGraphsComponent {
  @Input() ulist: Array<UserNovel> | null;
}
