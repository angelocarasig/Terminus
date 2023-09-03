import { Component, Input, OnInit } from '@angular/core';
import { NovelContainerWrapper } from '../../models/novel-container-wrapper';

@Component({
  selector: 'app-profile-novel-container',
  templateUrl: './profile-novel-container.component.html',
  styleUrls: ['./profile-novel-container.component.scss']
})
export class ProfileNovelContainerComponent implements  OnInit {
  @Input() title: string;
  @Input() novelsContainerWrapper: NovelContainerWrapper;

  ngOnInit() {
    this.novelsContainerWrapper.paginateNumber = 1;
  }

  handlePageChange(page: number): void {
    this.novelsContainerWrapper.paginateNumber = page;
  }
}
