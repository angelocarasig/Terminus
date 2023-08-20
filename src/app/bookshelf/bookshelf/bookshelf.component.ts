import { Component } from '@angular/core';
import { ThemeService } from '../../shared/services/theme/theme.service';
import { UserService } from '../../shared/services/user/user.service';
import { User } from '../../shared/models/user/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.scss']
})
export class BookshelfComponent {
  currentUser: Observable<User | undefined>;

  constructor(private userService: UserService, themeService: ThemeService) {
    this.currentUser = this.userService.getCurrentUserAsObservable();
  }
}
