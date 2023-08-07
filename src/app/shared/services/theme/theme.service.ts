import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DarkTheme, LightTheme, Theme } from './theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private activeThemeSubject = new BehaviorSubject<Theme>(DarkTheme);

  constructor() {
    this.setActiveTheme(this.activeThemeSubject.getValue());
  }

  getAvailableThemes(): Theme[] {
    return [LightTheme, DarkTheme];
  }

  getActiveTheme(): Theme {
    return this.activeThemeSubject.getValue();
  }

  getActiveThemeName(): string {
    return this.getActiveTheme().name;
  }

  toggleActiveTheme(): void {
    const newTheme = this.activeThemeSubject.getValue().name === 'dark' ? LightTheme : DarkTheme;
    this.setActiveTheme(newTheme);
  }

  setActiveTheme(theme: Theme): void {
    this.activeThemeSubject.next(theme);
    this.applyThemeColors(theme);
  }

  private applyThemeColors(theme: Theme): void {
    Object.keys(theme.colors).forEach((property) => {
      document.documentElement.style.setProperty(property, theme.colors[property]);
    });
  }
}
