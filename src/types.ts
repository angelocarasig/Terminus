import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexChart,
  ApexPlotOptions, ApexTooltip
} from 'ng-apexcharts';

import { VisualNovel } from './app/shared/models/vn/visual-novel';
import { UserNovel } from './app/shared/models/vn/user-novel';

import { MONTHS } from './constants';

interface BaseResponseType<T> {
  results: Array<T>;
  more: boolean;
}

export type VNResponseType = BaseResponseType<VisualNovel>;

export type UListResponseType = BaseResponseType<UserNovel>;

export enum Theme {
  Light = 'light',
  Dark = 'dark'
}

export type ChartOptions = {
  title: ApexTitleSubtitle;
  chart: ApexChart;
  series: ApexAxisChartSeries;
  colors: Array<string>;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
};

export type Month = typeof MONTHS[number];

export interface HeatmapEntry {
  name: Month;
  data: Array<{ x: string; y: number }>; // x is the year as a string, y is the frequency
}

export type ContentSensitivity = 'Everyone' | 'Questionable' | 'Explicit';
