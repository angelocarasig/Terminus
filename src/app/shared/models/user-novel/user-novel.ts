import {VN} from '../vn/VN';
import {Label} from '../label/label';

export interface UserNovel {
  id: string;
  finished: any;
  started: any;
  vote: number | null;
  voted: number | null;
  added: number;
  lastmod: number;
  notes: string | null;

  vn: VN;
  labels: Array<Label>;
}
