import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';

import { Theme } from '../../../../types';

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
    this.themeService.toggleTheme();
    this.updateThemeAndIcon();
  }

  private updateThemeAndIcon(): void {
    this.themeIcon = this.themeService.currentTheme === Theme.Dark ? 'featherMoon' : 'featherSun';
  }
}

