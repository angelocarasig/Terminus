import {Tag} from '../tag/tag';
import {Image} from '../image/image';
import {Title} from '../title/title';
import {Screenshot} from '../screenshot/screenshot';

export interface VN {
  image: Image;
  length: number;
  description: string;
  released: string;
  alttitle: string | null;
  devstatus: number;
  length_votes: number;
  votecount: number;
  length_minutes: number | null;
  titles: Title[];
  olang: string;
  platforms: string[];
  aliases: string[];
  tags: Tag[];
  languages: string[];
  title: string;
  screenshots: Screenshot[];
  rating: number;
  popularity: number;
}
