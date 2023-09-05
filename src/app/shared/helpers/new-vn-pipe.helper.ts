/**
 * About:
 * This file serves as a pipe that will format each usernovel / visualnovel to remove reliance on separate components to transform data each time.
 */
import { UserNovel } from '../models/vn/user-novel';
import { formattedDate, GetSexualRating, GetViolenceRating } from './utilities.helper';
import { Screenshot } from '../models/vn/screenshot';
import { VisualNovel } from '../models/vn/visual-novel';

export class VNDataPipe {
  constructor() {
  }

  transformUserNovel(userNovel: UserNovel): UserNovel {
    // UserNovel specific
    this.formatUserNovelDates(userNovel);

    this.transformVisualNovel(userNovel.vn);

    return userNovel;
  }



  transformVisualNovel(visualNovel: VisualNovel): VisualNovel {
    // VisualNovel specific
    this.formatVisualNovelScreenshotResolution(visualNovel);
    this.formatVisualNovelRatingDistribution(visualNovel);
    return visualNovel;
  }

  private formatUserNovelDates(userNovel: UserNovel): void {
    userNovel.addedFormatted = new Date(formattedDate(userNovel.added));
    userNovel.lastmodFormatted = new Date(formattedDate(userNovel.lastmod));
  }

  private formatVisualNovelScreenshotResolution(visualNovel: VisualNovel): void {
    visualNovel.screenshots.forEach((screenshot: Screenshot) => {
      screenshot.thumbnail = screenshot.thumbnail.replace('t.vndb.org/st', 't.vndb.org/sf')
    })
  }

  private formatVisualNovelRatingDistribution(visualNovel: VisualNovel): void {
    visualNovel.image.sexualFormatted = GetSexualRating(visualNovel.image.sexual);
    visualNovel.image.violenceFormatted = GetViolenceRating(visualNovel.image.violence);

    visualNovel.screenshots.forEach((screenshot: Screenshot) => {
      screenshot.sexualFormatted = GetSexualRating(screenshot.sexual);
      screenshot.violenceFormatted = GetViolenceRating(screenshot.violence);
    })
  }
}
