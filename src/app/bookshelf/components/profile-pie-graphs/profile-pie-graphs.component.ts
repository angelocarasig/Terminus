import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from '../../../shared/services/theme/theme.service';

import { LabelType } from '../../../shared/models/vn/label';
import { UserNovel } from '../../../shared/models/vn/user-novel';

import { Theme } from '../../../../types';

@Component({
  selector: 'app-profile-pie-graphs',
  templateUrl: './profile-pie-graphs.component.html',
  styleUrls: ['./profile-pie-graphs.component.scss']
})
export class ProfilePieGraphsComponent implements OnInit {
  @Input() ulist: Array<UserNovel> | null;

  data: any;
  options: any;

  constructor(private themeService: ThemeService) {
    this.themeService.theme$.subscribe((theme: Theme) => {
      this.updateGraphData(theme);
      this.updateGraphOptions(theme);
    });
  }

  ngOnInit() {

    this.data = null;
    this.options = null;

    this.updateGraphData(this.themeService.currentTheme);
    this.updateGraphOptions(this.themeService.currentTheme);
  }

  updateGraphData(theme: Theme) {
    if (this.ulist == null) return;

    const labelMap = new Map<string, number>();

    this.ulist.forEach(item => {
      item.labels.forEach(label => {
        const labelValue = typeof label.label === 'string' ? label.label : LabelType[label.label];
        if (labelMap.has(labelValue)) {
          labelMap.set(labelValue, labelMap.get(labelValue)! + 1);
        } else {
          labelMap.set(labelValue, 1);
        }
      });
    });

    const labels = Array.from(labelMap.keys());
    const data = Array.from(labelMap.values());

    this.data = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            'rgba(255,84,84,0.5)',
            'rgba(255,144,59,0.5)',
            'rgba(255,228,82,0.5)',
            'rgba(108,225,112,0.5)',
            'rgba(100,178,224,0.5)',
            'rgba(135,106,232,0.5)',
            'rgba(101,98,101,0.5)'
          ],
          hoverBackgroundColor: [
            'rgba(255,84,84,0.9)',
            'rgba(255,144,59,0.9)',
            'rgba(255,228,82,0.9)',
            'rgba(108,225,112,0.9)',
            'rgba(100,178,224,0.9)',
            'rgba(135,106,232,0.9)',
            'rgba(101,98,101,0.9)'
          ],
          borderWidth: 1,
          borderColor: `${theme === Theme.Dark ? 'lightgray' : 'darkgray'}`
        }
      ]
    };

    console.log("Updated graph data...");
  }

  updateGraphOptions(theme: Theme) {
    this.options = {
      plugins: {
        legend: {
          position: 'left',
          align: 'middle',
          labels: {
            usePointStyle: true,
            color: `${theme === Theme.Dark ? 'white' : 'black'}`
          }
        }
      }
    };
    console.log("Updated graph options...");
  }
}
