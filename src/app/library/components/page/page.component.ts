import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../../shared/services/user/user.service';

import { GetSkeletonUserNovel } from '../../../shared/helpers/utilities.helper';

import { UserNovel } from '../../../shared/models/vn/user-novel';
import { VisualNovel } from '../../../shared/models/vn/visual-novel';

@Component({
  selector: 'library-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  novel: VisualNovel | UserNovel;

  constructor(public userService: UserService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.novel = navigation?.extras.state?.['novel'];

    if (!('vn' in this.novel)) {
      this.novel = GetSkeletonUserNovel(this.novel);
    }
  }

  ngOnInit() {
    console.log('From Page Component: ', this.novel);
  }
}
