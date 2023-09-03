import { UserNovel } from '../../shared/models/user-novel/user-novel';

export interface NovelContainerWrapper {
  novels: Array<UserNovel>;
  paginateNumber: number;
}
