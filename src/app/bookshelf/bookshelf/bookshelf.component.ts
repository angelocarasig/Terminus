import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../shared/services/theme/theme.service';
import { UserService } from '../../shared/services/user/user.service';
import { User } from '../../shared/models/user/user';
import { Observable } from 'rxjs';
import { UserNovel } from '../../shared/models/user-novel/user-novel';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.scss']
})
export class BookshelfComponent implements  OnInit {
  currentUser: Observable<User | undefined>;
  currentUserNovelList: Array<UserNovel> = new Array<UserNovel>();

  constructor(private userService: UserService, themeService: ThemeService) {

  }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUserAsObservable();
    this.currentUser.subscribe(currentUser => {
      this.currentUserNovelList = currentUser?.ulist!;
    });

    this.currentUserNovelList.forEach(currentNovel => {
      console.log(JSON.stringify(currentNovel.labels));
    })
  }
}
