/**
 * About:
 * This file serves as a pipe that will format each usernovel / visualnovel to remove reliance on separate components to transform data each time.
 */
import { GetSexualRating, GetViolenceRating, unixTimestampToDate } from './utilities.helper';

import { UserNovel } from '../models/vn/user-novel';
import { Screenshot } from '../models/vn/screenshot';
import { VisualNovel } from '../models/vn/visual-novel';

export class NovelDataFormatterHelper {
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
    userNovel.addedFormatted = new Date(unixTimestampToDate(userNovel.added));
    userNovel.lastmodFormatted = new Date(unixTimestampToDate(userNovel.lastmod));
    userNovel.votedFormatted = userNovel.voted != null ? new Date(unixTimestampToDate(userNovel.voted)) : undefined;
  }

  private formatVisualNovelScreenshotResolution(visualNovel: VisualNovel): void {
    visualNovel.screenshots.forEach((screenshot: Screenshot) => {
      screenshot.thumbnail = screenshot.thumbnail.replace('t.vndb.org/st', 't.vndb.org/sf');
    });
  }

  private formatVisualNovelRatingDistribution(visualNovel: VisualNovel): void {
    if (visualNovel.image == null) {
      console.warn(`Visual Novel ${visualNovel.title} is missing its image property. Skipping image transformation...`);
      return;
    }

    if (visualNovel.image.sexual == null || visualNovel.image.violence == null) {
      console.warn(`Visual Novel ${visualNovel.title} is missing sexual or violence attributes. Continuing with assumption of safe and non-violent image.`);

      visualNovel.image.sexual = 0;
      visualNovel.image.violence = 0;
    }

    visualNovel.image.sexualFormatted = GetSexualRating(visualNovel.image.sexual);
    visualNovel.image.violenceFormatted = GetViolenceRating(visualNovel.image.violence);

    visualNovel.screenshots.forEach((screenshot: Screenshot, index: number) => {
      if (screenshot.sexual == null || screenshot.violence == null) {
        console.warn(`Screenshot for VN ${visualNovel.title} is missing sexual or violence attributes. Continuing with assumption of safe and non-violent image.`);
        visualNovel.screenshots[index].sexual = 0;
        visualNovel.screenshots[index].violence = 0;
      }

      screenshot.sexualFormatted = GetSexualRating(screenshot.sexual!);
      screenshot.violenceFormatted = GetViolenceRating(screenshot.violence!);
    });
  }
}
