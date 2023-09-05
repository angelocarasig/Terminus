import { SexualRating, ViolenceRating } from './visual-novel';

export interface Screenshot {
  thumbnail: string;
  thumbnail_dims: Array<number>;
  sexual: number;
  sexualFormatted: SexualRating;
  violence: number;
  violenceFormatted: ViolenceRating;
}
