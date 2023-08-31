import { Component } from '@angular/core';

import { ThemeService } from './shared/services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // noinspection JSUnusedLocalSymbols
  constructor(private themeService: ThemeService) {  }
}
