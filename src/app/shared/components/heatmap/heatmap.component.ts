import { Component, Input, OnInit } from '@angular/core';
import { UserNovel } from '../../models/vn/user-novel';
import { ChartOptions } from '../../../../types';
import { convertToHeatmap } from '../../helpers/heatmap.helper';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit {
  @Input() userNovelList: Array<UserNovel>;
  public chartOptions: Partial<ChartOptions> | any;

  ngOnInit() {
    const size = 500;

    this.chartOptions = {
      series: convertToHeatmap(this.userNovelList),
      chart: {
        width: size,
        type: 'heatmap',
        background: 'transparent',
        foreColor: '#ffffff' // Axis colors
      },
      yaxis: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#48ff2e'],
      title: {
        text: 'VNDB Profile'
      },
      plotOptions: {
        heatmap: {
          distributed: true,
          shadeIntensity: 0.75,
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 0,
                color: '#4b4b4b'
              },
              {
                from: 1,
                to: 50,
                color: '#00FF00'
              }
            ]
          }
        }
      },
      tooltip: {
        enabled: true,
        fillSeriesColor: true,
        fixed: {
          enabled: true,
          position: 'topLeft'
        }
      }
    };

    console.log(this.chartOptions.series);
  }
}
