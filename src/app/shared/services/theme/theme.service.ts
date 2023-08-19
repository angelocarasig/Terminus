import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Theme } from '../../../../types';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private activeTheme: Theme;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.activeTheme = this.initThemeFromLocalStorage() ?? this.initThemeFromBrowser();
    this.document.body.classList.add(this.activeTheme);
    localStorage.setItem('theme', this.activeTheme);
  }

  get currentTheme(): Theme {
    return this.activeTheme;
  }

  toggleTheme(): void {
    this.activeTheme = this.activeTheme === Theme.Light ? Theme.Dark : Theme.Light;

    /* If support for multiple themes in future */
    // for (const theme of Object.values(Theme)) {
    //   this.document.body.classList.toggle(theme);
    // }

    this.document.body.classList.remove(Theme.Light, Theme.Dark);
    this.document.body.classList.add(this.activeTheme);

    localStorage.setItem('theme', this.activeTheme);
  }

  private initThemeFromBrowser(): Theme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.Dark : Theme.Light;
  }

  private initThemeFromLocalStorage(): Theme | null {
    const storedTheme = localStorage.getItem('theme') as Theme;
    return storedTheme && Object.values(Theme).includes(storedTheme) ? storedTheme : null;
  }
}
