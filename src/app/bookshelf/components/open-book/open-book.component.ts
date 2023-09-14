import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../../shared/services/user/user.service';

import { GetSkeletonUserNovel } from '../../../shared/helpers/utilities.helper';

import { UserNovel } from '../../../shared/models/vn/user-novel';
import { VisualNovel } from '../../../shared/models/vn/visual-novel';

@Component({
  selector: 'app-open-book',
  templateUrl: './open-book.component.html',
  styleUrls: ['./open-book.component.scss']
})
export class OpenBookComponent implements OnInit {
  novel: VisualNovel | UserNovel;

  constructor(public userService: UserService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.novel = navigation?.extras.state?.['novel'];

    if (!('vn' in this.novel)) {
      this.novel = GetSkeletonUserNovel(this.novel);
    }
  }

  ngOnInit() {
    console.log('From OpenBook: ', this.novel);
    return;
  }

  protected readonly JSON = JSON;
}
