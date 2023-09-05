import { SexualRating, ViolenceRating } from './visual-novel';

export interface Image {
  dims: Array<number>;
  votecount: number;
  url: string;
  id: string;
  sexual: number;
  sexualFormatted: SexualRating;
  violence: number;
  violenceFormatted: ViolenceRating;
}
