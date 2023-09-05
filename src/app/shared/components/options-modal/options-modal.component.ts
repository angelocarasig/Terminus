import { Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { MenuItem } from 'primeng/api';
import { OptionTabs } from '../../models/options/optionTabs';

@Component({
  selector: 'app-options-modal',
  templateUrl: './options-modal.component.html',
  styleUrls: ['./options-modal.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('0.1s', style({ opacity: 1 }))
      ])
      // Dismounts from *ngIf so no use for adding fadeOut
    ])
  ]
})
export class OptionsModalComponent implements OnInit {
  @Output() outsideClicked = new EventEmitter<void>();

  activeTab: OptionTabs;
  items: MenuItem[];

  constructor(private renderer: Renderer2) {
    this.activeTab = OptionTabs.PROFILE;

    this.items = [
      {
        label: OptionTabs.PROFILE,
        icon: 'pi pi-user',
        command: (event) => {
          console.log('Profile');
          this.handleSwitchTab(event);
        }
      },
      {
        label: OptionTabs.APPEARANCE,
        icon: 'pi pi-eye',
        command: (event) => {
          console.log('Appearance');
          this.handleSwitchTab(event);
        }
      },
    ]
  }

  ngOnInit(): void {
  }

  handleClickOutside(): void {
    this.outsideClicked.emit();
  }

  handleSwitchTab(newActiveTab: any): void {
    this.activeTab = newActiveTab.item.label;
  }

  openUrl(url: string): void {
    const link = this.renderer.createElement('a');
    this.renderer.setAttribute(link, 'href', url);
    this.renderer.setAttribute(link, 'target', '_blank');
    link.click();
  }

  protected readonly Option = Option;
  protected readonly OptionTabs = OptionTabs;
}
