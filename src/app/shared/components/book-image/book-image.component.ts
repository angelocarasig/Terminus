import { Component, Input, OnInit } from '@angular/core';
import { OptionsService } from '../../services/options/options.service';
import { SexualRating, ViolenceRating } from '../../models/vn/visual-novel';
import { Options } from '../../models/options/options';

@Component({
  selector: 'shared-book-image',
  templateUrl: './book-image.component.html',
  styleUrls: ['./book-image.component.scss']
})
export class BookImageComponent implements OnInit {
  @Input() imageSource: string;
  @Input() styleClass: string;

  @Input() sexualRating: SexualRating;
  @Input() violenceRating: ViolenceRating;
  imageSensitivity: Options;

  imageLoaded = false;
  blurImage = false;

  constructor(private optionsService: OptionsService) {
    this.optionsService.getOptions().subscribe({
      next: value => {
        this.imageSensitivity = value;
        this.updateImageSensitivity();
      }
    });
  }

  ngOnInit() {
    this.updateImageSensitivity();
  }

  updateImageSensitivity(): void {
    const shouldBlurForSexualSensitivity =
      (this.imageSensitivity.imageSexualSensitivity === SexualRating.SAFE &&
        (this.sexualRating === SexualRating.SUGGESTIVE || this.sexualRating === SexualRating.EXPLICIT)) ||
      (this.imageSensitivity.imageSexualSensitivity === SexualRating.SUGGESTIVE &&
        this.sexualRating === SexualRating.EXPLICIT);

    const shouldBlurForViolenceSensitivity =
      (this.imageSensitivity.imageViolenceSensitivity === ViolenceRating.TAME &&
        (this.violenceRating === ViolenceRating.VIOLENT || this.violenceRating === ViolenceRating.BRUTAL)) ||
      (this.imageSensitivity.imageViolenceSensitivity === ViolenceRating.VIOLENT &&
        this.violenceRating === ViolenceRating.BRUTAL);

    this.blurImage = shouldBlurForSexualSensitivity || shouldBlurForViolenceSensitivity;
  }

  onImageLoad(): void {
    this.imageLoaded = true;
  }
}
