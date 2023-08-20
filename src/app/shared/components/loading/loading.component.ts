import { Component, OnInit } from '@angular/core';
import { VndbHelper } from '../../helpers/vndb/vndb.helper';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  constructor(private vndbHelper: VndbHelper, private userService: UserService) {
  }

  ngOnInit(): void {
    this.vndbHelper.updateUserNovels(this.userService.getCurrentUser()!).then();
  }
}
