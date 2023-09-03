import { VisualNovel } from './visual-novel';
import { Label } from './label';

export interface UserNovel {
  id: string;
  finished: any;
  started: any;
  vote: number | null;
  voted: number | null;
  added: number;
  lastmod: number;
  notes: string | null;

  vn: VisualNovel;
  labels: Array<Label>;
}
