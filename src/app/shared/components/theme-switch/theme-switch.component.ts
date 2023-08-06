import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent {
  currentTheme = 'dark';

  changeTheme(): void {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
  }

  getThemeName(): string {
    return this.currentTheme === 'dark' ? 'featherSun' : 'featherMoon';
  }
}

