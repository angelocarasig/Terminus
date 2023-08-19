import { Component } from '@angular/core';
import { ThemeService } from '../../shared/services/theme/theme.service';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.scss']
})
export class BookshelfComponent {
  constructor(private themeService: ThemeService) {
  }
}
