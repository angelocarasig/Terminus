import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user/user.service';
import { User } from '../../../shared/models/user/user';
import { Observable } from 'rxjs';
import { UserNovel } from '../../../shared/models/vn/user-novel';
import { VNDBService } from '../../../shared/services/vndb/vndb.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.scss']
})
export class BookshelfComponent implements OnInit {
  currentUser$: Observable<User | null>;
  userNovelList$: Observable<Array<UserNovel> | undefined>;

  constructor(private userService: UserService, private vndbService: VNDBService) { }

  ngOnInit(): void {
    this.currentUser$ = this.userService.currentUser$;
    console.log("Final Ulist Size: ", this.userService.getUser()?.ulist?.length);
    this.userNovelList$ = this.currentUser$.pipe(
      map(currentUser => {
        if (!currentUser) return;

        if (!this.userService.getUser()?.ulist) {
          this.vndbService.updateUserNovels(this.userService.getUser()!);
        }

        return currentUser?.ulist;
      })
    );
  }

  triggerRefreshUserNovels(): void {
    this.vndbService.updateUserNovels((this.userService.getUser()!));
  }
}
