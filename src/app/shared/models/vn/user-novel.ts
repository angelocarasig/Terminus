import { VisualNovel } from './visual-novel';
import { Label } from './label';

export interface UserNovel {
  id: string;
  finished: any;
  started: any;
  vote: number | null;
  voted: number;
  votedFormatted?: Date;
  added: number;
  addedFormatted?: Date;
  lastmod: number;
  lastmodFormatted?: Date;
  notes: string | null;

  vn: VisualNovel;
  labels: Array<Label>;
}
