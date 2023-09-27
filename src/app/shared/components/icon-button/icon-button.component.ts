import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent {
  @Input() iconName: string;
  @Input() iconType: 'featherIcon' | 'tablerIcon';
  @Input() cssClass: string;
}
