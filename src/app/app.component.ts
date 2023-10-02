import { Component } from '@angular/core';

import { ThemeService } from './shared/services/theme/theme.service';
import { OptionsService } from './shared/services/options/options.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // noinspection JSUnusedLocalSymbols
  constructor(private themeService: ThemeService, private optionsService: OptionsService) {  }
}
