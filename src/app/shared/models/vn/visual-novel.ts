import { Tag } from './tag';
import { Image } from './image';
import { Title } from './title';
import { Screenshot } from './screenshot';
import { Developer } from './developer';

export interface VisualNovel {
  image: Image;
  length: number;
  description: string;
  released: string;
  alttitle: string | null;
  developers: Developer[];
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
