import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent implements  OnInit {
  themeIcon: 'featherSun' | 'featherMoon' = 'featherMoon';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.updateThemeAndIcon();
  }

  toggleTheme(): void {
    this.themeService.toggleActiveTheme();
    this.updateThemeAndIcon();
  }

  private updateThemeAndIcon(): void {
    if (this.themeService.getActiveThemeName() === 'dark') {
      this.themeIcon = 'featherMoon';
    }
    else {
      this.themeIcon = 'featherSun';
    }
  }
}

