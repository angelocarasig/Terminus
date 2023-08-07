/*
-------------------------------------
  Theme:
  - This houses styling that is used to define color styles based on light/dark mode
  - Adjust --dark/--light properties as needed
  - Do not touch anything else
-------------------------------------
 */

export interface ThemeColors {
  [key:string]: string; // To make accessible by string

  '--background-color': string;
  '--background-lighter-color': string;
  '--stroke-color': string;
  '--main-color': string;
  '--highlight-color': string;
  '--secondary-color': string;
  '--tertiary-color': string;
  '--card-background-color': string;
  '--card-heading-color': string;
  '--card-paragraph-color': string;
  '--button-color': string;
  '--button-text-color': string;
  '--headline-color': string;
  '--sub-headline-color': string;
  '--paragraph-color': string;
  '--success-color': string;
  '--info-color': string;
  '--warning-color': string;
  '--danger-color': string;
  '--help-color': string;
}

export interface Theme {
  name: 'dark' | 'light';
  colors: ThemeColors;
}

export const DarkTheme: Theme = {
  name: 'dark',
  colors: {
    '--background-color': '#232946',
    '--background-lighter-color': '#d4d8f0',
    '--stroke-color': '#616ca1',
    '--main-color': '#b8c1ec',
    '--highlight-color': '#eebbc3',
    '--secondary-color': '#000000',
    '--tertiary-color': '#eebbc3',
    '--card-background-color': '#fffffe',
    '--card-heading-color': '#232946',
    '--card-paragraph-color': '#232946',
    '--button-color': '#eebbc3',
    '--button-text-color': '#232946',
    '--headline-color': '#fffffe',
    '--sub-headline-color': '#232946',
    '--paragraph-color': '#b8c1ec',
    '--success-color': '#93DEAC',
    '--info-color': '#9BCAFF',
    '--warning-color': '#FFCF91',
    '--danger-color': '#FF5254',
    '--help-color': '#86E0E7',
  },
};

export const LightTheme: Theme = {
  name: 'light',
  colors: {
    '--background-color': '#a1dcb9',
    '--background-lighter-color': '#004643',
    '--stroke-color': '#004341',
    '--main-color': '#e8e4e6',
    '--highlight-color': '#f9bc60',
    '--secondary-color': '#abd1c6',
    '--tertiary-color': '#e16162',
    '--card-background-color': '#004643',
    '--card-heading-color': '#fffffe',
    '--card-paragraph-color': '#abd1c6',
    '--button-color': '#f9bc60',
    '--button-text-color': '#001e1d',
    '--headline-color': '#001e1d',
    '--sub-headline-color': '#0f3433',
    '--paragraph-color': '#abd1c6',
    '--success-color': '#40e771',
    '--info-color': '#6479ff',
    '--warning-color': '#ffd048',
    '--danger-color': '#ee2d2f',
    '--help-color': '#0fabb8',
  },
};

const activeTheme: 'dark' | 'light' = 'dark'; // Replace with 'light' for the light theme

export const currentTheme: Theme = activeTheme === 'dark' ? DarkTheme : LightTheme;
