import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { UserNovel } from '../../shared/models/user-novel/user-novel';
import { UserService } from '../../shared/services/user/user.service';
import { ChartOptions } from '../../../types';
import { convertToHeatmap } from '../../shared/helpers/profile.heatmap.helper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() userNovelList: Array<UserNovel>;
  @Output() refreshNovelsTrigger = new EventEmitter<void>();

  public chartOptions: Partial<ChartOptions> | any;

  constructor(public userService: UserService, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.chartOptions = {
      series: convertToHeatmap(this.userNovelList),
      chart: {
        height: 400,
        width: 1000,
        type: 'heatmap'
      },
      stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: ['rgb(117,117,117)']
      },
      grid: {
        row: {
          colors: ['#242629']
        },
        column: {
          colors: ['#242629']
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#ffffff']
        }
      },
      colors: ['#48ff2e'],
      title: {
        text: 'VNDB Profile'
      },
      plotOptions: {
        heatmap: {
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
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        custom: undefined,
        fillSeriesColor: false,
        theme: false,
        style: {
          fontSize: '12px',
          fontFamily: undefined
        },
        onDatasetHover: {
          highlightDataSeries: false
        },
        x: {
          show: true,
          format: 'dd MMM',
          formatter: undefined
        },
        y: {
          formatter: undefined,
          title: {
            formatter: (seriesName: any) => seriesName
          }
        },
        z: {
          formatter: undefined,
          title: 'Size: '
        },
        marker: {
          show: true
        },
        fixed: {
          enabled: false,
          position: 'topRight',
          offsetX: 0,
          offsetY: 0
        }
      }
    };

    console.log(this.chartOptions.series);
  }


  openProfileInVNDB(): void {
    const url = `https://vndb.org/${this.userService.getUser()?.uid}`;
    const link = this.renderer.createElement('a');
    this.renderer.setAttribute(link, 'href', url);
    this.renderer.setAttribute(link, 'target', '_blank');
    link.click();
  }
}
