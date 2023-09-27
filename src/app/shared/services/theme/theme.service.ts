import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { BehaviorSubject } from 'rxjs';

import { Theme } from '../../../../types';
import { LOCAL_STORAGE_KEYS } from '../../../../constants';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private activeTheme: Theme;
  private themeSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(this.initThemeFromLocalStorage() ?? this.initThemeFromBrowser());
  theme$ = this.themeSubject.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.activeTheme = this.themeSubject.value;
    this.document.body.classList.add(this.activeTheme);
    localStorage.setItem(LOCAL_STORAGE_KEYS.theme, this.activeTheme);
  }

  get currentTheme(): Theme {
    return this.activeTheme;
  }

  toggleTheme(): void {
    this.activeTheme = this.activeTheme === Theme.Light ? Theme.Dark : Theme.Light;
    this.document.body.classList.remove(Theme.Light, Theme.Dark);
    this.document.body.classList.add(this.activeTheme);
    localStorage.setItem(LOCAL_STORAGE_KEYS.theme, this.activeTheme);

    this.themeSubject.next(this.activeTheme);
  }

  private initThemeFromBrowser(): Theme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.Dark : Theme.Light;
  }

  private initThemeFromLocalStorage(): Theme | null {
    const storedTheme = localStorage.getItem(LOCAL_STORAGE_KEYS.theme) as Theme;
    return storedTheme && Object.values(Theme).includes(storedTheme) ? storedTheme : null;
  }
}
