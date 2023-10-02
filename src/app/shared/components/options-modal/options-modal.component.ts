import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { OptionTabs } from '../../models/options/option-tabs';
import { UserService } from '../../services/user/user.service';
import { SexualRating, ViolenceRating } from '../../models/vn/visual-novel';
import { OptionsService } from '../../services/options/options.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'shared-options-modal',
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
  authKey = '';

  activeTab: OptionTabs;
  tabOptions = [
    {
      label: OptionTabs.PROFILE,
      icon: 'pi pi-user',
      command: (event: any) => {
        console.log('Profile');
        this.handleSwitchTab(event);
      }
    },
    {
      label: OptionTabs.APPEARANCE,
      icon: 'pi pi-palette',
      command: (event: any) => {
        console.log('Appearance');
        this.handleSwitchTab(event);
      }
    },
    {
      label: OptionTabs.BEHAVIOUR,
      icon: 'pi pi-eye',
      command: (event: any) => {
        console.log('Behaviour');
        this.handleSwitchTab(event);
      }
    }
  ];

  sexualImageFilterOptions = [
    { label: SexualRating.SAFE, value: SexualRating.SAFE },
    { label: SexualRating.SUGGESTIVE, value: SexualRating.SUGGESTIVE },
    { label: SexualRating.EXPLICIT, value: SexualRating.EXPLICIT },
  ]

  violenceImageFilterOptions = [
    { label: ViolenceRating.TAME, value: ViolenceRating.TAME },
    { label: ViolenceRating.VIOLENT, value: ViolenceRating.VIOLENT },
    { label: ViolenceRating.BRUTAL, value: ViolenceRating.BRUTAL },
  ]

  // Default values
  imageFilterSelections = {
    imageSexualSensitivity: SexualRating.SAFE,
    imageViolenceSensitivity: ViolenceRating.TAME,
  }

  constructor(public userService: UserService, private optionsService: OptionsService, private messageService: MessageService) {
    this.activeTab = OptionTabs.PROFILE;

    this.optionsService.getOptions().subscribe(options => {
      this.imageFilterSelections = { ...this.imageFilterSelections, ...options };
    });
  }

  ngOnInit(): void {
    console.log(this.imageFilterSelections);
  }

  handleClickOutside(): void {
    this.outsideClicked.emit();
  }

  handleSwitchTab(newActiveTab: any): void {
    this.activeTab = newActiveTab.item.label;
  }

  handleVerifyAuthKey(): void {
    console.log(this.authKey);
    this.userService.verifyUserToken(this.authKey).subscribe({
      next: (res) => {
        console.log(res);
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Successfully Added Auth Key!'});
      },
      error: err => {
        console.error(err);
        this.messageService.add({severity: 'error', summary: 'Error', detail: "Could not validate the provided Auth Key."});
      }
    })
  }

  onImageFilterSelectionChange(): void {
    this.optionsService.updateOptions(this.imageFilterSelections);
  }

  protected readonly OptionTabs = OptionTabs;
}
