import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from '../../../shared/services/user/user.service';
import { VNDBService } from '../../../shared/services/vndb/vndb.service';

import { User } from '../../../shared/models/user/user';
import { UserNovel } from '../../../shared/models/vn/user-novel';

@Component({
  selector: 'library-shell',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  currentUser$: Observable<User | null>;
  userNovelList$: Observable<Array<UserNovel> | undefined>;

  constructor(private userService: UserService, private vndbService: VNDBService) {
    console.log(`User ${this.userService.getUser()?.username}'s Visual Novel List: `, this.userService.getUser()?.ulist);
  }

  ngOnInit(): void {
    this.currentUser$ = this.userService.currentUser$;
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
